import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
  username: string | null;
}

const initialState = {
  email: null,
  token: null,
  id: null,
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.username = null;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export const { setUser, removeUser, setUsername } = userSlice.actions;

export default userSlice.reducer;