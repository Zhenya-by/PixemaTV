import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  imdbRating: string;
  Genre: string;
}

export interface MovieState {
  isOpen: any;
  favoriteMovies: Movie[];
}

const initialState: MovieState = {
  favoriteMovies: [],
  isOpen: undefined
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    toggleFavoriteMovie: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const movieIndex = state.favoriteMovies.findIndex(
        (favMovie) => favMovie.imdbID === movie.imdbID
      );
      if (movieIndex === -1) {
        state.favoriteMovies.push(movie);
      } else {
        state.favoriteMovies.splice(movieIndex, 1);
      }
    },
  },
});

export const { toggleFavoriteMovie } = movieSlice.actions;

export default movieSlice.reducer;
