import { createSlice } from '@reduxjs/toolkit';
import {
  Mentor,
  SessionLinks,
  Student,
  updateCodeOpenStatus,
  updateCurrentLinks,
  updateUserLoggedAction,
} from '../helpers/types';

export interface GlobalInterface {
  user: Mentor | Student | undefined;
  codeOpen: string;
  sessionLinks: SessionLinks;
}

const initialState: GlobalInterface = {
  user: undefined,
  codeOpen: '',
  sessionLinks: { student: '', mentor: '' },
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // Update the user connected:
    UpdateUserLogged: (state, action: updateUserLoggedAction) => {
      state.user = action.payload;
    },

    // Change the app status:
    ChangeCodeOpen: (state, action: updateCodeOpenStatus) => {
      state.codeOpen = action.payload;
    },

    // Update the current session links:
    UpdateLinks: (state, action: updateCurrentLinks) => {
      state.sessionLinks = action.payload;
    },
  },
});

export const { UpdateUserLogged, ChangeCodeOpen, UpdateLinks } =
  globalSlice.actions;

export default globalSlice.reducer;
