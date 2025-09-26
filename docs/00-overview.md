# Project Overview

**This project is a full-stack music setup that allows download songs from YouTube via a Chrome extension, storing them on a Raspberry Pi Samba Share, and playing them through a custom web-based music player.**

---

## Architecture

```
[Extension Frontend]
 ↓ POST
[Extension Backend: yt-dlp + ffmpeg] 
 ↓ Writes
[Pi Samba Share]
 ↓ Read
[Song Player Backend: Flask + Watchdog]
 ↓ API
[Song Player Frontend: ReactJS]
```

---

## Components

- **Chrome Extension**
	Downloads YouTube videos, converts them to MP3, and saves directly into the Pi Samba share.
- **Raspberry Pi**
	Acts as the central hub: shared storage, backend server, and frontend hosting.
- **Song Player**
	Web-based audio player with search, shuffle, and request-limiting backend

---

## Technologies

- **Backend:** Python, Flask, yt-dlp, ffmpeg, watchdog
- **Frontend:** React, Chrome Extension API
- **System:** Raspberry Pi, Samba
