import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";
import { RootState } from "../../store";
import { fetchUser } from "./currentUser.async";

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
      state.request.codeMessage = action.payload.code;
      state.request.message = action.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      console.log(state);
      state.request.pending = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      console.log(state, action);
      state.request.pending = false;
      state.request.codeMessage = action.error.code;
      state.request.message = action.error.message;
      state.request.status = 400;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {

      state.request.pending = false;
      state.userEmail = action.payload.userEmail;
      state.jwt = action.payload.jwt;
      state.request.status = action.payload.status;
    });
  },
});
export const { setCurrentUser, setCurrentUserError, dropCurrentUser } =
  currentUserSlice.actions;

//TODO - написать один запрос для всего селектора

export const getjwt = (state: RootState) => state.currentUserReducer.jwt;

export const getCurrentUser = (state: RootState) =>
  state.currentUserReducer.userEmail;

export const getCurrentUserRequest = (state: RootState) =>
  state.currentUserReducer.request;

export default currentUserSlice.reducer;
