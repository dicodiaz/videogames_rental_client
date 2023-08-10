import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './slices/reservationSlice';
import userReducer from './slices/userSlice';
import videogameReducer from './slices/videogameSlice';

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
export const selectVideogames = (state) => state.videogameReducer.videogames;
export const selectVideogamesError = (state) => state.videogameReducer.videogamesError;
export const selectVideogame = (state) => state.videogameReducer.videogame;
export const selectVideogameError = (state) => state.videogameReducer.videogameError;
export const selectAddVideogameLoading = (state) => state.videogameReducer.addVideogameLoading;
export const selectAddVideogameError = (state) => state.videogameReducer.addVideogameError;
export const selectDeleteMessage = (state) => state.videogameReducer.deleteVideogameMessage;
export const selectDeleteError = (state) => state.videogameReducer.deleteVideogameError;
export const selectReservations = (state) => state.reservationReducer.reservations;
export const selectReservationsError = (state) => state.reservationReducer.reservationsError;
export const selectReserveLoading = (state) => state.reservationReducer.addReservationLoading;
export const selectReserveError = (state) => state.reservationReducer.addReservationError;

export default setupStore;
