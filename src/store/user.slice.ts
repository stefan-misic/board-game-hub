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
import { StoreState } from './index';

interface ChangeUserPasswordParams { id: string; password: string; secretKey: string; }
export const changeUserPassword = createAsyncThunk(
  'user/changeUserPassword',
  async ({ id, password, secretKey }: ChangeUserPasswordParams, { rejectWithValue }) => {
    try {
      const response = await changeUserPasswordService(id, password, secretKey);

      return response;
    } catch (error: any){
      return rejectWithValue(error?.message);
    }
  }
);

interface LoginUserParams { email: string; password: string; }
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: LoginUserParams, { rejectWithValue }) => {
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
    } catch (error: any){
      return rejectWithValue(error?.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUserService();
      localStorage.removeItem('currentUser');
      
      return response;
    } catch (error: any){
      return rejectWithValue(error?.message);
    }
  }
);

interface SignupUserParams { email: string; password: string; }
export const signupUser = createAsyncThunk(
  'user/signupUser',
  async ({ email, password }: SignupUserParams, { rejectWithValue }) => {
    try {
      const response = await createUserService(email, password);

      return response;
    } catch (error: any){
      return rejectWithValue(error?.message);
    }
  }
);

interface RecoverUserParams { email: string; }
export const recoverUserPassword = createAsyncThunk(
  'user/recoverUserPassword',
  async ({ email }: RecoverUserParams, { rejectWithValue }) => {
    try {
      const response = await recoverUserPasswordService(email);

      return response;
    } catch (error: any){
      return rejectWithValue(error?.message);
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
        }
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.currentUser = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.currentUser = {
          id: '',
          email: null,
          permissions: null,
          error: action.error.message
        }
      });
  }
});

export const selectCurrentUser = (state: StoreState) => state.user.currentUser;
export const selectCurrentUserPermissions = (state: StoreState) => state.user.currentUser?.permissions;
export const selectIsCurrentUserAdmin = (state: StoreState) => !!state.user.currentUser?.permissions?.includes('admin');

export default userSlice.reducer;
