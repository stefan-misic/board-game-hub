import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StoreState } from './index';

interface GlobalState {
  hasMessage: boolean;
  isLoading: boolean;
  message: string;
  messageType: string;
}
const initialState: GlobalState = {
  hasMessage: false,
  isLoading: false,
  message: '',
  messageType: ''
};

interface SetMessagePayload {
  hasMessage: boolean;
  message: string;
  messageType: string;
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setHasMessage: (state, action: PayloadAction<SetMessagePayload>) => {
      state.hasMessage = action.payload.hasMessage;
      state.message = action.payload.message;
      state.messageType = action.payload.messageType;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const selectHasMessage = (state: StoreState) => state.global.hasMessage;
export const selectIsLoading = (state: StoreState) => state.global.isLoading;
export const selectMessage = (state: StoreState) => state.global.message;
export const selectMessageType = (state: StoreState) => state.global.messageType;

export const { setHasMessage, setIsLoading } = globalSlice.actions;

export default globalSlice.reducer;
