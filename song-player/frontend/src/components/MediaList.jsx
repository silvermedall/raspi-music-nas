import "./MediaList.css";

function MediaList({ songs, onSelectSong }) {
  if (!Array.isArray(songs)) return <p>No songs available</p>;

  return (
    <div className="media-list">
      {songs.length === 0 && <p>No songs found</p>}
      <ul>
        {songs.map((song) => (
          <li
            key={song.id}
            onClick={() => onSelectSong(song)}
            className="media-item"
          >
            {song.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MediaList;
