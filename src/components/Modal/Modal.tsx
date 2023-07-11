import React, { useState, useEffect } from "react";
import "./Modal.scss";
import DropdownMovieType, { MovieType } from "../DropdownMivieType/DropdownMovieType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface Movie {
  Title: string;
  Year: string;
  Type: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [year, setYear] = useState("");
  const [movieType, setMovieType] = useState<MovieType | undefined>(undefined);
  const [movies, setMovies] = useState<Movie[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const searchMovies = () => {
    const apiKey = "ad0d5fb3";
    const url = `http://www.omdbapi.com/?s=${movieName}&y=${year}&type=${movieType}&apikey=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.Search || []);
        navigate('/search-results');
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        // Обработка ошибки
      });
  };

  return (
    <>
      {isOpen && (
        <div className={`modal ${isAnimating ? "animate-in" : "animate-out"}`}>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <h2>Filtres</h2>
            <h3>Movie name</h3>
            <input
              className="input-filters"
              type="text"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
            <h3>Year</h3>
            <input
              className="input-filters"
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <h3>Movie type</h3>
            <DropdownMovieType onTypeSelect={setMovieType} />
            <button onClick={searchMovies}>Search</button>

            <h2>Search Results</h2>
            <ul>
              {movies.map((movie) => (
                <li key={movie.Title}>
                  {movie.Title} ({movie.Year}) - {movie.Type}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
