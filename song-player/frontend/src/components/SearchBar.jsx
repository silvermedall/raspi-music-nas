import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, onShuffle }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={handleChange}
      />
      <button onClick={onShuffle}>Shuffle</button>
    </div>
  );
}

export default SearchBar;
