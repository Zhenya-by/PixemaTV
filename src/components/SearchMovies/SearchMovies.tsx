import React, { useState } from "react";
import axios from "axios";
import "./SearchMovies.scss";
import { API_KEY, OMDB_URL } from "../../api/apiKey";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface SearchResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

const SearchMovies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleSearch = async () => {
    try {
      const modifiedSearchQuery = searchQuery.replace(/\s+/g, "*") + "*";
      const response = await axios.get<SearchResult>(
        `${OMDB_URL}?s=${modifiedSearchQuery}&${API_KEY}`
      );
      if (response.data.Response === "True") {
        setSearchResults(response.data.Search);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch();

    if (value === "") {
      setSearchResults([]);
    }
  };

  return (
    <div className="SearchMovies">
      <div className="SearchMovies--search-container">
        <input
          placeholder="Search"
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((movie) => (
            <div>
              <li key={movie.imdbID}>
                <img src={movie.Poster} alt={movie.Title} />
                <div>
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                </div>
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchMovies;
