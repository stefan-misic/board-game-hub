import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasMessage: false,
  isLoading: false,
  message: '',
  messageType: ''
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setHasMessage: (state, action) => {
      state.hasMessage = action.payload.hasMessage;
      state.message = action.payload.message;
      state.messageType = action.payload.messageType;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const selectHasMessage = (state) => state.global.hasMessage;
export const selectIsLoading = (state) => state.global.isLoading;
export const selectMessage = (state) => state.global.message;
export const selectMessageType = (state) => state.global.messageType;

export const { setHasMessage, setIsLoading } = globalSlice.actions;

export default globalSlice.reducer;
