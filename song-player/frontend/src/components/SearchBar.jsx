import "./SearchBar.css";

function SearchBar({ query, onSearch, onShuffle }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrap">
        <span aria-hidden="true">Search</span>
        <input
          type="text"
          placeholder="Artist, song, or filename"
          value={query}
          onChange={handleChange}
        />
      </div>
      <button className="shuffle-button" onClick={onShuffle}>
        Shuffle
      </button>
    </div>
  );
}

export default SearchBar;
