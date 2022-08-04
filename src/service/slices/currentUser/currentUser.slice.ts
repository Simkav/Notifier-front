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
  },
});

export const { setCurrentUser, dropCurrentUser } = currentUserSlice.actions;
export const getCurrentUser = (state: RootState) =>
  state.currentUserReducer.userEmail;
export const getjwt = (state: RootState) => state.currentUserReducer.jwt;

export default currentUserSlice.reducer;
