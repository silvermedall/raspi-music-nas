# Raspberry Pi

## Overview

**The Raspberry Pi acts as the storage hub and server for the system. It provides Samba for shared access and hosts the Song Player's backend/frontend.**

---

## Role in System

- Provides Samba-shared folder for the extension backend to save songs.
- Hosts the Flask backend and React frontend of the Song Player.
- Allows management and monitoring via SSH.

---

## Features

- Samba integration with the target PC.
- File management directly in the shared folder.
- SSH access for monitoring and debugging.
- Runs Song Player server (backend + frontend).

---

## Implementation Details

- Samba config ensures the extension backend can write directly into the shared folder.
- Pi's Python environment runs Flask backend.
- React build is served by the Pi as static frontend.