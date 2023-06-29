import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import './Card.scss';
import { API_KEY, OMDB_URL } from '../../api/apiKey';

interface ICard {
}

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
}

export const Card: FC<ICard> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${OMDB_URL}?${API_KEY}&s=avengers`);
        const data = response.data;

        if (data.Search) {
          setMovies(data.Search);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='card-container'>
      {movies.map((movie) => (
        <div key={movie.Title} className="movie-card">
          <img src={movie.Poster} alt={movie.Title} />
          <div className="movie-details">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

