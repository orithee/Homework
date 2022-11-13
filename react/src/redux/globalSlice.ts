import { createSlice } from '@reduxjs/toolkit';
import { Mentor, Student, updateUserLoggedAction } from '../helpers/types';

export interface GlobalInterface {
  user: Mentor | Student | undefined;
}

const initialState: GlobalInterface = {
  user: undefined,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // Update the user connected:
    updateUserLogged: (state, action: updateUserLoggedAction) => {
      state.user = action.payload;
    },
  },
});

export const { updateUserLogged } = globalSlice.actions;

export default globalSlice.reducer;
