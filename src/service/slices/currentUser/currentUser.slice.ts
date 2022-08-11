import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";
import { RootState } from "../../store";
import { fetchUser } from "./currentUser.async";
import { errorDataType } from "./types";

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
      state.request.pending = true;
      state.request.codeMessage = null;
      state.request.message = null;
      state.request.status = null;
    });

    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      const {
        data: { statusCode, message },
        statusText,
      } = payload as errorDataType;

      state.request.pending = false;
      state.request.codeMessage = statusText;
      state.request.message = message;
      state.request.status = statusCode;
    });

    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.request.pending = false;
      state.userEmail = payload?.userEmail;
      state.jwt = payload?.jwt;
      state.request.status = payload?.status;
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
