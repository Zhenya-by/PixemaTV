import { Movie } from './type';

export const toggleFavoriteMovie = (movie: Movie) => {
  return {
    type: 'TOGGLE_FAVORITE_MOVIE',
    movie,
  };
};