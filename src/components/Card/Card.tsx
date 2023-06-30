import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Card.scss';
import { API_KEY, OMDB_URL } from '../../api/apiKey';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${OMDB_URL}?${API_KEY}&s=avengers`);
        const data = response.data;

        if (data.Search) {
          const moviesWithDetails = await Promise.all(
            data.Search.map(async (movie: Movie) => {
              const detailsResponse = await axios.get(`${OMDB_URL}?${API_KEY}&i=${movie.imdbID}`);
              const detailsData = detailsResponse.data;

              return {
                ...movie,
                Rating: detailsData.imdbRating,
                Genre: detailsData.Genre
              };
            })
          );

          // Sort movies by rating
          const sortedMovies = moviesWithDetails.sort(
            (movieA, movieB) => parseFloat(movieB.Rating || '0') - parseFloat(movieA.Rating || '0')
          );

          setMovies(sortedMovies);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const formatGenres = (genres: string | undefined): string => {
    if (!genres) return '';

    return genres.split(',').join(' • ');
  };

  return (
    <div className='card-container'>
      {movies.map((movie) => (
        <div key={movie.Title} className='movie-card'>
          <Link to={`/movies/${movie.imdbID}`} className='movie-card'>
            <div className='img-poster'>
              <img src={movie.Poster} alt={movie.Title} />
            </div>
            <p className='movie-card--rating'>{movie.Rating}</p>
            <div className='movie-details'>
              <h3>{movie.Title}</h3>
              <span>
                <p className='movie-details--p'>{formatGenres(movie.Genre)}</p>
                <p className='movie-details--p'>{movie.Year}</p>
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
