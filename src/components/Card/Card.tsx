import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Card.scss";
import "../../App.scss";
import { API_KEY, OMDB_URL } from "../../api/apiKey";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Rating?: string;
  Genre?: string;
}

interface CardProps {}

export const Card: React.FC<CardProps> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieIds = [
          "tt0111161",
          "tt0468569",
          "tt1375666",
          "tt0816692",
          "tt0167260",
          "tt0137523",
          "tt0133093",
          "tt0109830",
          "tt0110912",
          "tt1375666",
          "tt0068646",
          "tt0076759",
          "tt0102926",
          "tt0090605",
          "tt0080684",
          "tt0076759",
          "tt0082971",
          "tt0073486",
          "tt0133093",
          "tt0109830",
          "tt0114369",
          "tt0120815",
          "tt0068646",
          "tt0088763",
          "tt0050083",
          "tt0363163",
          "tt0099685",
          "tt0081505",
          "tt0075314",
          "tt0120586",
        ];

        const moviePromises = movieIds
          .slice((currentPage - 1) * 12, currentPage * 12)
          .map(async (id) => {
            const response = await axios.get(`${OMDB_URL}?${API_KEY}&i=${id}`);
            const data = response.data;

            if (data && data.Response === "True") {
              const movie = {
                Title: data.Title,
                Year: data.Year,
                Poster: data.Poster,
                imdbID: data.imdbID,
                Rating: data.imdbRating,
                Genre: data.Genre,
              };

              return movie;
            }
          });

        const movieData = await Promise.all(moviePromises);
        const filteredMovies = movieData.filter(
          (movie) => movie !== undefined
        ) as Movie[];
        setMovies((prevMovies) => [...prevMovies, ...filteredMovies]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const formatGenres = (genres: string | undefined): string => {
    if (!genres) return "";

    return genres.split(",").join(" • ");
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className={`card-container ${isLoading ? "" : "show"}`}>
        {movies.map(
          (movie) =>
            // Добавляем проверку на отсутствие изображения
            movie.Poster !== "N/A" && (
              <div key={movie.Title} className="movie-card">
                <Link to={`/movies/${movie.imdbID}`} className="movie-card">
                  <div className="img-poster">
                    <img src={movie.Poster} alt={movie.Title} />
                  </div>
                  <p className="movie-card--rating">{movie.Rating}</p>
                  <div className="movie-details">
                    <h3>{movie.Title}</h3>
                    <span>
                      <p className="movie-details--p">
                        {formatGenres(movie.Genre)}
                      </p>
                      {/* <p className="movie-details--p">{movie.Year}</p> */}
                    </span>
                  </div>
                </Link>
              </div>
            )
        )}
        <div className="pagination">
          <div className="pagination-container">
            <button onClick={handleNextPage}>▼ Page</button>
          </div>
        </div>
      </div>
    </>
  );
};
