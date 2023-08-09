import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './slices/reservationsSlice';
import userReducer from './slices/userSlice';
import videogameReducer from './slices/videogamesSlice';

const reducer = {
  userReducer,
  videogameReducer,
  reservationReducer,
};

const setupStore = (preloadedState) => configureStore({
  preloadedState,
  reducer,
});

export const selectJWT = (state) => state.userReducer.jwt;
export const selectUser = (state) => state.userReducer.user;
export const selectSignUpLoading = (state) => state.userReducer.signUpLoading;
export const selectSignUpError = (state) => state.userReducer.signUpError;
export const selectLoginLoading = (state) => state.userReducer.loginLoading;
export const selectLoginError = (state) => state.userReducer.loginError;
export const selectLogoutError = (state) => state.userReducer.logoutError;
export const selectVideogames = (state) => state.videogameReducer.all;
export const selectVideogamesError = (state) => state.videogameReducer.allError;
export const selectVideogameDetails = (state) => state.videogameReducer.details;
export const selectVideogameDetailsError = (state) => state.videogameReducer.detailsError;
export const selectVideogameDeleteMessage = (state) => state.videogameReducer.deleteMessage;
export const selectVideogameDeleteError = (state) => state.videogameReducer.deleteError;
export const selectReservations = (state) => state.reservationReducer.reservations;
export const selectReservationsError = (state) => state.reservationReducer.error;

export default setupStore;
