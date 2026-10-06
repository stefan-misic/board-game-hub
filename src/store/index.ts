import { configureStore } from '@reduxjs/toolkit';

import globalSlice from './global.slice';
import userSlice from './user.slice';

const store = configureStore({
  reducer: {
    global: globalSlice,
    user: userSlice
  }
});

export type StoreState = ReturnType<typeof store.getState>;
// export type StoreDispatch = typeof store.dispatch;

export default store;
