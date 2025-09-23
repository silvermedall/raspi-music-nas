import { useEffect, useRef, useState } from "react";
import "./MediaPlayer.css";

function MediaPlayer({ currentSong, onSongEnd }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = `BACKEND_IP:5000/api/songs/${currentSong.id}`;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Autoplay blocked:", err);
          setIsPlaying(false);
        });
    }
  }, [currentSong]);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const handleTimeUpdate = () => setCurrentTime(audioEl.currentTime);
    const handleLoadedMetadata = () => setDuration(audioEl.duration || 0);
    const handleEnded = () => onSongEnd();

    audioEl.addEventListener("timeupdate", handleTimeUpdate);
    audioEl.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioEl.addEventListener("ended", handleEnded);

    return () => {
      audioEl.removeEventListener("timeupdate", handleTimeUpdate);
      audioEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioEl.removeEventListener("ended", handleEnded);
    };
  }, [onSongEnd]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="media-player">
      <div className="media-top">
        {currentSong ? (
          <span>{currentSong.title}</span>
        ) : (
          <span>No song selected</span>
        )}

        <button onClick={togglePlayPause} disabled={!currentSong}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>
      <audio ref={audioRef} />

      <div className="media-bottom">
        <div className="media-progress">
          <span className="current-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            step="0.1"
          />
          <span className="duration">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default MediaPlayer;
