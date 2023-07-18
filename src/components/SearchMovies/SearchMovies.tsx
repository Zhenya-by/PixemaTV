import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SearchMovies.scss";
import { API_KEY, OMDB_URL } from "../../api/apiKey";
import Loader from "../Loader/Loader";
import { Link, NavLink } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { Filters } from "../../assets/icons";
import { UserInfo } from "../UserInfo/UserInfo";
import { Input } from "../Input/Input";
import { MenuCard } from "components/MenuCard/MenuCard";
import { Logo } from "components/Logo/Logo";
import { LogoMain } from "components/Logo/LogoMain";

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
  const [isMovieClicked, setIsMovieClicked] = useState(false);

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
      setIsMovieClicked(false);
    }
  };

  const handleMovieClick = () => {
    setIsMovieClicked(true);
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="SearchMovies">
        <div
          className={`SearchMovies--search-container ${
            isMovieClicked ? "hide" : ""
          }`}
        >
          <Link to='/home'>
            <LogoMain/>
          </Link>
          <Modal isOpen={isModalOpen} onClose={closeModal} />
          <div className="search-wrap">
          <input className="search-input"
            placeholder="Search"
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button className="btn-filters" onClick={openModal}>
            <Filters />
          </button>
          </div>
          <UserInfo username={"Evgeni Minko"}/>
          <MenuCard/>
          
        </div>

        {searchResults.length > 0 && !isMovieClicked && (
          <ul className={`list ${searchResults.length > 0 ? "show" : ""}`}>
            {/* <Loader isLoading={isLoading} /> */}
            {searchResults.map((movie) => (
              <div key={movie.imdbID}>
                <Link
                  to={`/search/movies/${movie.imdbID}`}
                  onClick={handleMovieClick}
                >
                  <li className="list-search">
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
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchMovies;
