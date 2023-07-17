import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducer';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


