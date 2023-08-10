import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../constants';

export const getVideogames = createAsyncThunk(
  'videogame/getVideogames',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const url = `${BASE_URL}/videogames`;
    const config = {
      headers: { Accept: 'application/json', Authorization: state.userReducer.jwt },
    };
    const response = await axios.get(url, config).catch((error) => error);

    if (response.status === 200) {
      return response.data;
    }

    return rejectWithValue(response.response.data.error);
  },
);

export const getVideogame = createAsyncThunk(
  'videogame/getVideogame',
  async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const url = `${BASE_URL}/videogames/${id}`;
    const config = {
      headers: { Accept: 'application/json', Authorization: state.userReducer.jwt },
    };
    const response = await axios.get(url, config).catch((error) => error);

    if (response.status === 200) {
      return response.data;
    }

    return rejectWithValue(response.response.data.error);
  },
);

export const addVideogame = createAsyncThunk(
  'videogame/addVideogame',
  async ({
    name, photoURL, description, pricePerDay,
  }, { getState, rejectWithValue }) => {
    const state = getState();
    const url = `${BASE_URL}/videogames`;
    const data = {
      videogame: {
        name,
        photo: photoURL,
        description,
        price_per_day: pricePerDay,
      },
    };
    const config = {
      headers: { Accept: 'application/json', Authorization: state.userReducer.jwt },
    };
    const response = await axios.post(url, data, config).catch((error) => error);

    if (response.status === 201) {
      return response.data;
    }

    return rejectWithValue(response.response.data.error);
  },
);

export const deleteVideogame = createAsyncThunk(
  'videogame/deleteVideogame',
  async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const url = `${BASE_URL}/videogames/${id}`;
    const config = {
      headers: { Accept: 'application/json', Authorization: state.userReducer.jwt },
    };
    const response = await axios.delete(url, config).catch((error) => error);

    if (response.status === 200) {
      return { message: response.data.message, id };
    }

    return rejectWithValue(response.response.data.error);
  },
);

const videogameSlice = createSlice({
  name: 'videogame',
  initialState: {},
  reducers: {
    clearVideogame: (state) => {
      state.videogame = null;
    },
  },
  extraReducers: {
    [getVideogames.fulfilled]: (state, { payload }) => {
      state.videogames = payload;
      state.videogamesError = null;
    },
    [getVideogames.rejected]: (state, { payload }) => {
      state.videogamesError = payload;
    },
    [getVideogame.fulfilled]: (state, { payload }) => {
      state.videogame = payload;
      state.videogameError = null;
    },
    [getVideogame.rejected]: (state, { payload }) => {
      state.videogameError = payload;
    },
    [addVideogame.fulfilled]: (state, { payload }) => {
      state.videogame = payload;
      state.addVideogameError = null;
      state.addVideogameLoading = false;
    },
    [addVideogame.pending]: (state) => {
      state.addVideogameLoading = true;
    },
    [addVideogame.rejected]: (state, { payload }) => {
      state.addVideogameError = payload;
      state.addVideogameLoading = false;
    },
    [deleteVideogame.fulfilled]: (state, { payload }) => {
      const { message, id } = payload;
      state.videogames = state.videogames.filter((videogame) => videogame.attributes.id !== id);
      state.deleteVideogameMessage = message;
      state.deleteVideogameError = null;
    },
    [deleteVideogame.rejected]: (state, { payload }) => {
      state.deleteVideogameError = payload;
      state.deleteVideogameMessage = null;
    },
  },
});

export const { clearVideogame } = videogameSlice.actions;

export default videogameSlice.reducer;
