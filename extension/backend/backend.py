from flask import Flask, request, jsonify
from flask_cors import CORS
from win10toast import ToastNotifier
import yt_dlp
import threading
import os


app = Flask(__name__)
CORS(app)

ffmpeg_path = os.path.join(os.path.dirname(__file__), "ffmpeg.exe")
toaster = ToastNotifier()


def download_audio(url, folder_path=None):
    if not folder_path:
        folder_path = os.getcwd()

    os.makedirs(folder_path, exist_ok=True)

    output_template = os.path.join(folder_path, "%(title)s.%(ext)s")

    ydl_opts = {
        "format": "bestaudio/best",
        "ffmpeg_location": ffmpeg_path,
        "outtmpl": output_template,
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ],
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
        info = ydl.extract_info(url, download=True)
        title = info.get("title", "Audio")
        filename = f"{title}.mp3"

    toaster.show_toast(
        "Download Complete",
        f"{filename} saved.",
        icon_path=None,
        duration=5,
        threaded=True,
    )


@app.route("/download", methods=["POST"])
def download():
    data = request.json
    url = data.get("url")
    folder_path = data.get("folderPath")

    if not url:
        return jsonify({"error": "URL not provided"}), 400

    threading.Thread(target=download_audio, args=(url, folder_path)).start()
    return jsonify({"message": "Download started"}), 200


if __name__ == "__main__":
    app.run(port=5000)
