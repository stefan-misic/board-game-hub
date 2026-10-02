import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createUserService } from '../services/account.services';

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await createUserService(email, password);
      //   const userData = {
      //     email: response?.targets?.[0]?.identifier,
      //     id: response?.targets?.[0]?.userId
      //   };
      //   localStorage.setItem('currentUser', JSON.stringify(userData));
      
      //   return userData;
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
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.currentUser = action.payload;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.currentUser = { error: action.error.message }; 
//       });
//   }
});

export const selectCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;
