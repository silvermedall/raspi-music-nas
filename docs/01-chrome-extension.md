# Chrome Extension

## Overview

**The Chrome Extension provides an easy way to download YouTube videos as MP3 files and directly into the Raspberry Pi Samba share.**

---

## Role in System

- Frontend triggers download requests.
- Backend handles video download and conversion.
- Files are written directly to the Pi's shared folder.

---

## Features

- Extension popup for user interaction.
- Notification when a download starts.
- Windows system pop-up when download/convert completes.
- Supports multiple simultaneous downloads.

---

## Implementation Details

### Frontend
- Provides simple UI to trigger downloads.
- Sends requests to backend via HTTP.

### Backend
- **Tools:** yt-dlp (downloads webm), ffmpeg (converts to mp3.
- Saves output to user-specified folder (in this case directly into the Samba-shared music folder).