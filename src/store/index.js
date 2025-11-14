import { configureStore, createSlice } from '@reduxjs/toolkit';

const appInitialState = {
  0: 'app'
};

const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {}
});

const store = configureStore({
  reducer: {
    app: appSlice.reducer
  }
});

export default store;
