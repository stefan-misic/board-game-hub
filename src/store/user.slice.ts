import type { Models } from 'appwrite';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  changeUserPasswordService,
  createUserService,
  loginUserService,
  logoutUserService,
  readUserService,
  recoverUserPasswordService
} from '../services/account.services';
import { AuthenticationData } from '../types/authentication.types';
import { AsyncThunkConfig, StoreState } from './index';

interface ChangeUserPasswordParams { id: string; password: string; secretKey: string; }
export const changeUserPassword = createAsyncThunk<Models.Token, ChangeUserPasswordParams, AsyncThunkConfig>(
  'user/changeUserPassword',
  async ({ id, password, secretKey }: ChangeUserPasswordParams, { rejectWithValue }) => {
    try {
      const response = await changeUserPasswordService(id, password, secretKey);

      return response;
    } catch (error){
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

interface LoginUserParams { email: string; password: string; }
export const loginUser = createAsyncThunk<AuthenticationData, LoginUserParams, AsyncThunkConfig>(
  'user/loginUser',
  async ({ email, password }: LoginUserParams, { rejectWithValue }) => {
    try {
      const loginResponse = await loginUserService(email, password);
      const userResponse = await readUserService();

      const userData = {
        email: loginResponse?.providerUid || '',
        id: loginResponse?.userId || '',
        permissions: userResponse?.labels || null
      };
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      return userData;
    } catch (error){
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

export const logoutUser = createAsyncThunk<Record<string, never>, void, AsyncThunkConfig>(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUserService();
      localStorage.removeItem('currentUser');
      
      return response;
    } catch (error){
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

interface SignupUserParams { email: string; password: string; }
export const signupUser = createAsyncThunk<Models.User<Models.Preferences>, SignupUserParams, AsyncThunkConfig>(
  'user/signupUser',
  async ({ email, password }: SignupUserParams, { rejectWithValue }) => {
    try {
      const response = await createUserService(email, password);

      return response;
    } catch (error){
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

interface RecoverUserParams { email: string; }
export const recoverUserPassword = createAsyncThunk<Models.Token, RecoverUserParams, AsyncThunkConfig>(
  'user/recoverUserPassword',
  async ({ email }: RecoverUserParams, { rejectWithValue }) => {
    try {
      const response = await recoverUserPasswordService(email);

      return response;
    } catch (error){
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

const currentUserFromStorage = localStorage.getItem('currentUser') ? (JSON.parse(localStorage.getItem('currentUser')!) as AuthenticationData) : null;
interface UserState {
  currentUser: AuthenticationData | null;
}
const initialState: UserState = {
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
        state.currentUser = {
          id: '',
          email: null,
          permissions: null,
          error: action.error.message
        };
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.currentUser = {
          id: '',
          email: null,
          permissions: null,
          error: action.error.message
        };
      });
  }
});

export const selectCurrentUser = (state: StoreState) => state.user.currentUser;
export const selectCurrentUserPermissions = (state: StoreState) => state.user.currentUser?.permissions;
export const selectIsCurrentUserAdmin = (state: StoreState) => !!state.user.currentUser?.permissions?.includes('admin');

export default userSlice.reducer;
