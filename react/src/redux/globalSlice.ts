import { createSlice } from '@reduxjs/toolkit';
import {
  Mentor,
  Student,
  updateCodeOpenStatus,
  updateUserLoggedAction,
} from '../helpers/types';

export interface GlobalInterface {
  user: Mentor | Student | undefined;
  codeOpen: boolean;
}

const initialState: GlobalInterface = {
  user: undefined,
  codeOpen: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // Update the user connected:
    updateUserLogged: (state, action: updateUserLoggedAction) => {
      state.user = action.payload;
    },

    // Change the app status:
    ChangeCodeOpen: (state, action: updateCodeOpenStatus) => {
      state.codeOpen = action.payload;
    },
  },
});

export const { updateUserLogged, ChangeCodeOpen } = globalSlice.actions;

export default globalSlice.reducer;
