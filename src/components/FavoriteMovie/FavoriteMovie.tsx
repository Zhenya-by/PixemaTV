import { FC, useState, useEffect } from "react";
import "./FavoriteMovie.scss";
import { useDispatch, useSelector } from "react-redux";
import { Movie, MovieState } from "../../Store/type";
import { Link } from "react-router-dom";
import { toggleFavoriteMovie } from "../../Store/actions";
import Loader from "../Loader/Loader";

interface FavoriteMovieProps {}

export const FavoriteMovie: FC<FavoriteMovieProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const favoriteMovies = useSelector(
    (state: MovieState) => state.favoriteMovies
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

  useEffect(() =>{
    setIsLoading(false);
  })
  
  return (
    <div className="card-wrap">
      <Loader isLoading={isLoading} />
      {favoriteMovies.map((movie) => (
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
              {/* <p className="movie-details--p">{movie.Year}</p> */}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};


