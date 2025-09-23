import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import MediaList from "./components/MediaList";
import MediaPlayer from "./components/MediaPlayer";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    fetch("BACKEND_IP:5000/api/songs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.songs)) {
          setSongs(data.songs);
          setFilteredSongs(data.songs);
        } else {
          console.error("Unexpected data:", data);
        }
      })
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  const handleSearch = (query) => {
    setFilteredSongs(
      songs.filter((song) =>
        song.title.toLowerCase().includes(query.toLowerCase())
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
      <SearchBar onSearch={handleSearch} onShuffle={handleShuffle} />
      <MediaList songs={filteredSongs} onSelectSong={setCurrentSong} />
      <MediaPlayer currentSong={currentSong} onSongEnd={handleSongEnd} />
    </div>
  );
}

export default App;
