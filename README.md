# Raspberry Pi Music NAS

**Simple Project - Full-stack music setup: browser extension downloads songs to a Raspberry Pi Samba share, which are then served to a web-based song player.**

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Components](#components)
   - [Extension](#extension)
   - [Song Player](#song-player)
1. [Technologies Used](#technologies-used)
2. [Documentation](#documentation)

---

## Project Overview

This project demonstrates a full-stack music management system.

- **Goal:** Download songs from YouTube, store them on a Raspberry Pi, and play them through a web-based song player.
- **Highlights:**
  - Browser extension with backend for downloading.
  - Raspberry Pi Samba folder for shared music storage
  - Web-based song player with backend serving songs via API

---

## Architecture

```
[Extension Frontend]
 ↓ POST
[Extension Backend] 
 ↓ Writes
[Pi Samba Share]
 ↓ Read
[Song Player Backend]
 ↓ API
[Song Player Frontend]
```

---

## Components

### Extension

- **Purpose:** Allows downloading YouTube songs directly to the Pi Samba folder.
- **Structure:**
```
  extension/
	  ├─frontend/
		  ├─manifest.json
		  ├─popup.css
		  ├─popup.html
		  └─popup.js
	  └─backend/
		  ├─backend.py
		  └─ffmpeg.exe
  ```
- **Notes:**
  - Frontend communicates with backend via HTTP
  - Backend saves songs to user-specified folder, in this case Samba-shared folder

### Song Player

- **Purpose:** Provides a web interface to browse and play songs stored on the Pi.
- **Structure:**
```
  song-player/
	  ├─frontend/
		  ├─src/
			  ├─components/
				  ├─MediaList.css
				  ├─MediaList.jsx
				  ├─MediaPlayer.css
				  ├─MediaPlayer.jsx
				  ├─SearchBar.css
				  └─SearchBar.jsx
			  ├─App.css
			  ├─App.jsx
			  ├─index.css
			  └─main.jsx
		  ├─eslint.config.js
		  ├─index.html
		  ├─package-lock.json
		  ├─package.json
		  └─vite.config.js
	  └─backend/
		  └─backend.py
  ```
- **Notes:**
  - Backend reads from Samba-shared folder
  - Frontend fetches song list and streams audio

---

## Technologies Used

- Python, Flask
- React
- Raspberry Pi
- Samba

---

## Documentation

For a detailed breakdown of the project:

- [00 - Project Overview](docs/00-overview.md)
- [01 - Chrome Extension](docs/01-chrome-extension.md)
- [02 - Raspberry Pi](docs/02-raspberry-pi.md)
- [03 - Song Player](docs/03-song-player.md)