import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  // остальные поля состояния...
  isOpen: boolean;
}

const initialState: MovieState = {
  // остальные начальные значения...
  isOpen: false,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    // остальные редюсеры...
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleModal } = movieSlice.actions;
export default movieSlice.reducer;
