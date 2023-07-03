import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SearchMovies.scss";
import { API_KEY, OMDB_URL } from "../../api/apiKey";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
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
    // setIsLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);
    handleSearch(searchQuery, currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      // setIsLoading(true);
      setCurrentPage((prevPage) => prevPage - 1);
      handleSearch(searchQuery, currentPage - 1);
    }
  };

  useEffect(() => {
    if (searchQuery !== "") {
      // setIsLoading(true);
      handleSearch(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage]);

  return (
    <>
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

        {searchResults.length > 0 && (
          <ul className={`list ${searchResults.length > 0 ? "show" : ""}`}>
            <Loader isLoading={isLoading} />
            {searchResults.map((movie) => (
              <div key={movie.imdbID}>
                <Link to={`/movies/${movie.imdbID}`}>
                  <li>
                    <div className="img-poster">
                      <img src={movie.Poster} alt={movie.Title} />
                    </div>
                    <div>
                      <h3>{movie.Title}</h3>
                      <p>{movie.Year}</p>
                    </div>
                  </li>
                </Link>
              </div>
            ))}
          </ul>
        )}
        {searchResults.length > 0 && (
          <div className="pagination">
            {/* <Loader isLoading={isLoading} /> */}
            <button
              className="prev-button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              ◀•••
            </button>
            <button className="next-button" onClick={handleNextPage}>
              •••▶
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchMovies;
