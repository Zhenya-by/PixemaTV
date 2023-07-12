import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Movies.scss";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteMovie, Movie } from "../../Store/reducer";
import { getMovie } from "../../api/getMovie";
import { RootState } from "../../Store/store";

export interface IMovie {
  Poster: string;
  Genre: string;
  Title: string;
  imdbRating: string;
  Runtime: string;
  Plot: string;
  Year: string;
  Released: string;
  BoxOffice: string;
  Country: string;
  Actors: string;
  Director: string;
  Writer: string;
  Stars: string;
  imdbID: string;
}

export const Movies: React.FC = () => {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovie = async () => {
      if (id !== undefined) {
        const data = await getMovie(id);
        setMovie(data);
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);



  const formatGenres = (genres: string | undefined): string => {
    if (!genres) return "";

    return genres.split(",").join(" • ");
  };

  const handleAddToFavorites = () => {
    if (movie) {
      dispatch(toggleFavoriteMovie(movie));
    }
  };

  const isFavoriteMovie = (movie: Movie): boolean => {
    return (
      favoriteMovies &&
      favoriteMovies.some((favMovie: Movie) => favMovie.imdbID === movie.imdbID)
    );
  };

  const favoriteMovies = useSelector(
    (state: RootState) => state.movie.favoriteMovies
  );

  return (
    <div>
      <Loader isLoading={isLoading} />
      {movie && (
        <div className={`movie-container ${isLoading ? "" : "show"}`}>
          <div className="movie-container--left">
            <img
              className="poster-img"
              src={movie.Poster}
              alt={movie.Title}
            />
            <button
              className={`movie-card--favorite ${
                isFavoriteMovie(movie) ? "active" : ""
              }`}
              onClick={handleAddToFavorites}
            >
              Добавить в избранное
            </button>
          </div>
          <div className="movie-container--right">
            <h3>Genre: {formatGenres(movie.Genre)}</h3>
            <h1>{movie.Title}</h1>
            <div className="box-rating">
              <span className="ratingg">{movie.imdbRating}</span>
              <span>IMDb {movie.imdbRating}</span>
              <span>{movie.Runtime}</span>
            </div>
            <p className="plot">Plot: {movie.Plot}</p>
            <div className="box-movie">
              <div className="movie-container--left--list-box">
                <p>Year:</p>
                <p>Released:</p>
                <p>Box Office:</p>
                <p>Country:</p>
                <p>Actors:</p>
                <p>Director:</p>
                <p>Writer:</p>
              </div>
              <div className="movie-container--right--list-box">
                <p>{movie.Year}</p>
                <p>{movie.Released}</p>
                <p>{movie.BoxOffice}</p>
                <p>{movie.Country}</p>
                <p>{movie.Actors}</p>
                <p>{movie.Director}</p>
                <p>{movie.Writer}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
