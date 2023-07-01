import React, { useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (query: string, page: number) => {
    try {
      const modifiedSearchQuery = query.replace(/\s+/g, "*") + "*";
      const response = await axios.get<SearchResult>(
        `${OMDB_URL}?s=${modifiedSearchQuery}&${API_KEY}&page=${page}`
      );
      if (response.data.Response === "True") {
        // Получить только первые 5 фильмов
        const movies = response.data.Search.slice(0, 6);
        setSearchResults(movies);
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

    if (value === "") {
      setSearchResults([]);
    } else {
      handleSearch(value, 1);
      setCurrentPage(1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    handleSearch(searchQuery, currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      handleSearch(searchQuery, currentPage - 1);
    }
  };

  useEffect(() => {
    if (searchQuery !== "") {
      handleSearch(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage]);

  return (
    <div className="SearchMovies">
      <div className="SearchMovies--search-container">
        <input
          placeholder="Search"
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button>Search</button>
      </div>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((movie) => (
            <div key={movie.imdbID}>
              <li>
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
        <p></p>
      )}
      {searchResults.length > 0 && (
        <div className="pagination">
          <button
            className="prev-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev Page
          </button>
          <button className="next-button" onClick={handleNextPage}>
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
