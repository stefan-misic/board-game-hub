import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createUserService, loginUserService, logoutUserService } from '../services/account.services';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginUserService(email, password);
      const userData = {
        email: response?.providerUid,
        id: response?.userId
      };
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      return userData;
    } catch (error){
      return rejectWithValue(error?.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (params, { rejectWithValue }) => {
    try {
      const response = await logoutUserService();
      localStorage.removeItem('currentUser');
      
      return response;
    } catch (error){
      return rejectWithValue(error?.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await createUserService(email, password);

      return response;
    } catch (error){
      return rejectWithValue(error?.message);
    }
  }
);

const currentUserFromStorage = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;

const initialState = {
  currentUser: currentUserFromStorage
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.currentUser = { error: action.error.message }; 
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.currentUser = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.currentUser = { error: action.error.message }; 
      });
  }
});

export const selectCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;
