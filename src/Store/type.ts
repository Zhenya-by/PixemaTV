export interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  imdbRating: string;
  Genre: string;
}

export interface MovieState {
  favoriteMovies: Movie[];
}

export type MovieActionTypes = ToggleFavoriteMovieAction;

export interface ToggleFavoriteMovieAction {
  type: 'TOGGLE_FAVORITE_MOVIE';
  movie: Movie;
}
export const addToFavorites = (movie: Movie): MovieActionTypes => ({
  type: 'TOGGLE_FAVORITE_MOVIE',
  movie,
});



