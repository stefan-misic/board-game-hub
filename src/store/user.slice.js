import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  changeUserPasswordService,
  createUserService,
  loginUserService,
  logoutUserService,
  readUserService,
  recoverUserPasswordService
} from '../services/account.services';

export const changeUserPassword = createAsyncThunk(
  'user/changeUserPassword',
  async ({ id, password, secretKey }, { rejectWithValue }) => {
    try {
      const response = await changeUserPasswordService(id, password, secretKey);

      return response;
    } catch (error){
      return rejectWithValue(error?.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginResponse = await loginUserService(email, password);
      const userResponse = await readUserService();

      const userData = {
        email: loginResponse?.providerUid,
        id: loginResponse?.userId,
        permissions: userResponse?.labels
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

export const recoverUserPassword = createAsyncThunk(
  'user/recoverUserPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await recoverUserPasswordService(email);

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
export const selectCurrentUserPermissions = (state) => state.user.currentUser?.permissions;
export const selectIsCurrentUserAdmin = (state) => state.user.currentUser?.permissions?.includes('admin');

export default userSlice.reducer;
