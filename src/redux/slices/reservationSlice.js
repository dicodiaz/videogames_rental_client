import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../constants';

export const getReservations = createAsyncThunk(
  'reservation/getReservations',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const url = `${BASE_URL}/reservations`;
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

export const addReservation = createAsyncThunk(
  'reservation/addReservation',
  async ({ videogameId, days, totalPrice }, { getState, rejectWithValue }) => {
    const state = getState();
    const url = `${BASE_URL}/reservations`;
    const data = { reservation: { videogame_id: videogameId, days, total_price: totalPrice } };
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

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {},
  extraReducers: {
    [getReservations.fulfilled]: (state, { payload }) => {
      state.reservations = payload;
      state.reservationsError = null;
    },
    [getReservations.rejected]: (state, { payload }) => {
      state.reservationsError = payload;
    },
    [addReservation.fulfilled]: (state) => {
      state.addReservationError = null;
      state.addReservationLoading = false;
    },
    [addReservation.pending]: (state) => {
      state.addReservationLoading = true;
    },
    [addReservation.rejected]: (state, { payload }) => {
      state.addReservationError = payload;
      state.addReservationLoading = false;
    },
  },
});

export default reservationSlice.reducer;
