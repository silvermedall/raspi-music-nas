import "./MediaList.css";

function splitTitle(title) {
  const parts = title.split(" - ");
  if (parts.length < 2) return { title, artist: "Unknown artist" };

  return {
    artist: parts[0].trim(),
    title: parts.slice(1).join(" - ").trim(),
  };
}

function MediaList({ songs, currentSong, onSelectSong }) {
  if (!Array.isArray(songs)) {
    return <p className="empty-state">No songs available</p>;
  }

  return (
    <div className="media-list">
      {songs.length === 0 && (
        <div className="empty-state">
          <strong>No songs found</strong>
          <span>Try a different search.</span>
        </div>
      )}
      <ul>
        {songs.map((song) => {
          const metadata = splitTitle(song.displayTitle || song.title);
          const isActive = currentSong?.id === song.id;

          return (
            <li key={song.id}>
              <button
                type="button"
                onClick={() => onSelectSong(song)}
                className={`media-item ${isActive ? "is-active" : ""}`}
              >
                <span className="track-index">
                  {isActive ? "Playing" : String(song.id + 1).padStart(2, "0")}
                </span>
                <span className="track-copy">
                  <span className="track-title">{metadata.title}</span>
                  <span className="track-artist">{metadata.artist}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MediaList;
