import React, { FC, useEffect, useState } from "react";
import "./SearchFilter.scss";
import { Link, useLocation } from "react-router-dom";
import { toggleFavoriteMovie } from "../../Store/reducer";
import { MovieState } from "../../Store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  imdbRating: string;
  Genre: string;
}

interface ISearchFilter {
  movies: Movie[];
}

export const SearchFilter: FC<ISearchFilter> = ({}) => {
  const location = useLocation();
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const favoriteMovies = useSelector(
    (state: RootState) => state.movie.favoriteMovies
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (location.state && location.state.movies) {
      setSearchedMovies(location.state.movies);
    }
  }, [location.state]);
  const handleToggleFavorite = (movie: Movie) => {
    dispatch(toggleFavoriteMovie(movie));
  };

  const isFavoriteMovie = (movie: Movie): boolean => {
    return favoriteMovies.some((favMovie) => favMovie.imdbID === movie.imdbID);
  };
  return (
    <div>
      <ul className="card-container">
        {searchedMovies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <div className="img-poster">
              <Link to={`/movies/${movie.imdbID}`} className="movie-card-link">
                <img src={movie.Poster} alt={movie.Title} />
              </Link>
            </div>
            <button
              className={`movie-card--favorite ${
                isFavoriteMovie(movie) ? "active" : ""
              }`}
              onClick={() => handleToggleFavorite(movie)}
            >
              🤍
            </button>
            <div className="movie-details">
              <h3>{movie.Title}</h3>
              <span>
                <p className="movie-details--p">{movie.Year}</p>
                <p className="movie-details--p">{movie.Type}</p>
                <p className="movie-details--p">{movie.Genre}</p>
              </span>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};
