import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../constants';

export const signUp = createAsyncThunk(
  'user/signUp',
  async ({
    name, address, email, password,
  }, { rejectWithValue }) => {
    const url = `${BASE_URL}/signup`;
    const data = {
      user: {
        name,
        address,
        email,
        password,
      },
    };
    const config = { headers: { Accept: 'application/json' } };
    const response = await axios.post(url, data, config).catch((error) => error);

    if (response.status === 200) {
      return { user: response.data, jwt: response.headers.authorization };
    }

    return rejectWithValue(response.response.data.error);
  },
);

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    const url = `${BASE_URL}/login`;
    const data = { user: { email, password } };
    const config = { headers: { Accept: 'application/json' } };
    const response = await axios.post(url, data, config).catch((error) => error);

    if (response.status === 200) {
      return { user: response.data, jwt: response.headers.authorization };
    }

    return rejectWithValue(response.response.data.error);
  },
);

export const logout = createAsyncThunk('user/logout', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const url = `${BASE_URL}/logout`;
  const config = { headers: { Accept: 'application/json', Authorization: state.userReducer.jwt } };
  const response = await axios.delete(url, config).catch((error) => error);

  if (response.status === 200) {
    return response.data;
  }

  return rejectWithValue(response.response.data.error);
});

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUserDataFromLocalStorage: (state) => {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const { user, jwt } = JSON.parse(userData);
        state.user = user;
        state.jwt = jwt;
      } else {
        state.user = null;
      }
    },
  },
  extraReducers: {
    [signUp.fulfilled]: (state, { payload }) => {
      localStorage.setItem('user_data', JSON.stringify(payload));
      const { user, jwt } = payload;
      state.user = user;
      state.jwt = jwt;
      state.signUpError = null;
      state.signUpLoading = false;
    },
    [signUp.pending]: (state) => {
      state.signUpLoading = true;
    },
    [signUp.rejected]: (state, { payload }) => {
      state.signUpError = payload;
      state.signUpLoading = false;
    },
    [login.fulfilled]: (state, { payload }) => {
      localStorage.setItem('user_data', JSON.stringify(payload));
      const { user, jwt } = payload;
      state.user = user;
      state.jwt = jwt;
      state.loginLoading = false;
      state.loginError = null;
    },
    [login.pending]: (state) => {
      state.loginLoading = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.loginLoading = false;
      state.loginError = payload;
    },
    [logout.fulfilled]: (state) => {
      localStorage.removeItem('user_data');
      state.user = null;
      state.jwt = null;
      state.logoutError = null;
    },
    [logout.rejected]: (state, { payload }) => {
      localStorage.removeItem('user_data');
      state.user = null;
      state.jwt = null;
      state.logoutError = payload;
    },
  },
});

export const { setUserDataFromLocalStorage } = userSlice.actions;

export default userSlice.reducer;
