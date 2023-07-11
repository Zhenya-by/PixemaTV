import React, { FC, useEffect, useState } from "react";
import "./FavoriteMovie.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/store";
import { Movie } from "../../Store/reducer";
import { Link } from "react-router-dom";
import { toggleFavoriteMovie } from "../../Store/reducer";
import { FavoriteNoMovies } from "../../assets/images/image";
import Loader from "../Loader/Loader";

interface FavoriteMovieProps {}

export const FavoriteMovie: FC<FavoriteMovieProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const favoriteMovies = useSelector(
    (state: RootState) => state.movie.favoriteMovies
  );
  const dispatch = useDispatch();

  const handleToggleFavorite = (movie: Movie) => {
    dispatch(toggleFavoriteMovie(movie));
  };

  const isFavoriteMovie = (movie: Movie): boolean => {
    return favoriteMovies.some((favMovie) => favMovie.imdbID === movie.imdbID);
  };

  const formatGenres = (genres: string | undefined): string => {
    if (!genres) return "";

    return genres.split(",").join(" • ");
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="card-wrap">
      <Loader isLoading={isLoading} />
      {favoriteMovies.length === 0 ? (
        <div className="no-movies">
          <FavoriteNoMovies />
          <h2>No favorite movies</h2>
        </div>
      ) : (
        favoriteMovies.map((movie) => (
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
            <p className="movie-card--rating">{movie.imdbRating}</p>
            <div className="movie-details">
              <h3>{movie.Title}</h3>
              <span>
                <p className="movie-details--p">{formatGenres(movie.Genre)}</p>
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
