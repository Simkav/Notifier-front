import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";
import { RootState } from "../../store";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const { userEmail, jwt } = action.payload;
      state.userEmail = userEmail;
      state.jwt = jwt;
    },

    dropCurrentUser: () => initialState,

    setCurrentUserError: (state, action) => {
      state.error.code = action.payload.code;
      state.error.message = action.payload.message;

    },
  },
});

export const { setCurrentUser, setCurrentUserError, dropCurrentUser } =
  currentUserSlice.actions;

//TODO - написать один запрос для всего селектора

export const getjwt = (state: RootState) => state.currentUserReducer.jwt;

export const getCurrentUser = (state: RootState) =>
  state.currentUserReducer.userEmail;

export const getCurrentUserError = (state: RootState) =>
  state.currentUserReducer.error;

export default currentUserSlice.reducer;
