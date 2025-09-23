from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
from datetime import datetime
import time
import os
import glob
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

app = Flask(__name__)
CORS(app)

SONG_DIR = "~/music"
songs = []

REQUEST_LIMIT = 100
request_count = 0
last_reset = datetime.now().date()

LOG_DIR = "~/logs"
os.makedirs(LOG_DIR, exist_ok=True)


# Request Limiting
def cleanup_old_logs(days=7):
    cutoff = time.time() - days * 24 * 60 * 60
    for log_file in glob.glob(os.path.join(LOG_DIR, "*.json")):
        if os.path.getmtime(log_file) < cutoff:
            os.remove(log_file)


def reset_if_new_day():
    global request_count, last_reset
    today = datetime.now().date()
    if today != last_reset:
        request_count = 0
        last_reset = today
        cleanup_old_logs()


def log_request():
    ip = request.remote_addr
    today = datetime.now().strftime("%Y-%m-%d")
    log_file = os.path.join(LOG_DIR, f"{today}.json")

    entry = {"time": datetime.now().isoformat(), "ip": ip}

    if os.path.exists(log_file):
        with open(log_file, "r+") as f:
            data = json.load(f)
            data.append(entry)
            f.seek(0)
            json.dump(data, f, indent=2)
    else:
        with open(log_file, "w") as f:
            json.dump([entry], f, indent=2)


# Song Refresh
def refresh_songs():
    global songs
    songs = sorted([f for f in os.listdir(SONG_DIR) if f.endswith(".mp3")])


# Watchdog Event Handler
class SongFolderHandler(FileSystemEventHandler):
    def on_any_event(self, event):
        refresh_songs()


def start_watcher():
    refresh_songs()
    event_handler = SongFolderHandler()
    observer = Observer()
    observer.schedule(event_handler, SONG_DIR, recursive=False)
    observer.start()
    return observer


# Request Limiting
@app.before_request
def check_request_limit():
    global request_count
    reset_if_new_day()
    if request_count >= REQUEST_LIMIT:
        return jsonify({"error": "Request limit exceeded"}), 429
    request_count += 1
    print(f"Request count: {request_count}")


@app.after_request
def after_request(response):
    log_request()
    return response


# API Routes
@app.route("/api/songs")
def list_songs():
    song_list = [
        {"id": i, "title": filename, "url": f"/api/songs/{i}"}
        for i, filename in enumerate(songs)
    ]
    return jsonify({"songs": song_list}), 200


@app.route("/api/songs/<int:song_id>")
def get_song(song_id):
    if 0 <= song_id < len(songs):
        return send_from_directory(SONG_DIR, songs[song_id])
    return jsonify({"error": "Song not found"}), 404


if __name__ == "__main__":
    observer = start_watcher()
    try:
        app.run(port=5000)
    finally:
        observer.stop()
        observer.join()
