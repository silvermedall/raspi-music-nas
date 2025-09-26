# Song Player

## Overview

**The Song Player is a web-based music player that provides search, shuffle, and playback of songs stored on the Pi.**

---

## Role in System

- Reads songs from Samba-shared folder via backend.
- Provides a user-friendly interface in the browser.

---

## Features

- Custom audio player (play, pause, skip, shuffle).
- Search bar to filter available songs.
- Folder monitoring with watchdog.
- Daily request limiting to prevent abuse or DoS attempts.
- Log keeping with auto-cleanup after 7 days.

---

## Implementation Details

### Frontend
- Written in React (Vite).
- Simple but functional UI for browsing and playing songs.

### Backend
- Written in Flask (Python)
- Uses watchdog to track changes in the music folder.
- Serves:
	- ``/api/songs/`` → returns song list.
	- ``/api/songs/:id`` → streams audio.
- Request limiting avoids 
- Logs stored and automatically deleted after 7 days.