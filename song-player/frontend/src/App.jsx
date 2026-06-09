import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import MediaList from "./components/MediaList";
import MediaPlayer from "./components/MediaPlayer";
import "./App.css";

function cleanSongTitle(title) {
  return title
    .replace(/\.mp3$/i, "")
    .replace(/\s*\[[^\]]*\]\s*/g, " ")
    .replace(/\s*\([^)]*(official|video|lyric|lyrics|audio|prod\.?)[^)]*\)\s*/gi, " ")
    .replace(/\s*\|.*$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/songs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.songs)) {
          const normalizedSongs = data.songs.map((song) => ({
            ...song,
            displayTitle: cleanSongTitle(song.title),
          }));
          setSongs(normalizedSongs);
          setFilteredSongs(normalizedSongs);
        } else {
          console.error("Unexpected data:", data);
        }
      })
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  const handleSearch = (query) => {
    setQuery(query);
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      setFilteredSongs(songs);
      return;
    }

    setFilteredSongs(
      songs.filter((song) =>
        `${song.displayTitle} ${song.title}`.toLowerCase().includes(normalizedQuery)
      )
    );
  };

  const handleShuffle = () => {
    if (songs.length > 0) {
      const random = Math.floor(Math.random() * songs.length);
      setCurrentSong(songs[random]);
    }
  };

  const handleSongEnd = () => {
    if (!songs || songs.length === 0 || !currentSong) return;

    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">Naspi Music</p>
          <h1>Library</h1>
        </div>
        <div className="song-count">
          {filteredSongs.length}/{songs.length}
        </div>
      </header>
      <SearchBar
        query={query}
        onSearch={handleSearch}
        onShuffle={handleShuffle}
      />
      <MediaList
        songs={filteredSongs}
        currentSong={currentSong}
        onSelectSong={setCurrentSong}
      />
      <MediaPlayer currentSong={currentSong} onSongEnd={handleSongEnd} />
    </div>
  );
}

export default App;
