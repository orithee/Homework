import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './globalSlice';
import { GlobalInterface } from './globalSlice';

export const store = configureStore({
  reducer: {
    global: globalSlice,
  },
});

export type globalState = { global: GlobalInterface };
