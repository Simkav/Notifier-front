import { FormikValues } from "formik";
import { DispatchState } from "../../store";
import { setCurrentUser, setCurrentUserError } from "./currentUser.slice";
import axios from "axios";
import { authEnum } from "../../../features/Authorization/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "currentUser/fetchUser",
  (payload: { currentUser: FormikValues; whichForm: authEnum }) => {
    const { email, password } = payload.currentUser;
    const authorizationUrl = new URL(
      payload.whichForm === "authorization"
        ? process.env.REACT_APP_SIGN_IN_URL!
        : process.env.REACT_APP_REGISTER_URL!
    ).href;

    const aww = axios
      .post(authorizationUrl, {
        email: email,
        password: password,
      })
      .then((response) => {
        const userData = response.data;

        return {
          userEmail: userData.user.email,
          jwt: userData.tokens.access_token,
          status: response.status,
        };
      });
    return aww;
    // .catch((error) => ({
    //   code: error.message,
    //   message: error.response.data.message,
    //   status: error.request.status,
    // }));
  }
);

// export const handleAuth = (
//   values: FormikValues,
//   action: authEnum,
//   dispatch: DispatchState
// ) => {
//   const { email, password } = values;
//
//   const authorizationUrl = new URL(
//     action === "authorization"
//       ? process.env.REACT_APP_SIGN_IN_URL!
//       : process.env.REACT_APP_REGISTER_URL!
//   ).href;
//
//   axios
//     .post(authorizationUrl, {
//       email: email,
//       password: password,
//     })
//     .then((response) => {
//       const userData = response.data;
//       dispatch(
//         setCurrentUser({
//           userEmail: userData.user.email,
//           jwt: userData.tokens.access_token,
//         })
//       );
//       dispatch(
//         setCurrentUserError({
//           status: response.status,
//         })
//       );
//     })
//     .catch((error) =>
//       dispatch(
//         setCurrentUserError({
//           code: error.message,
//           message: error.response.data.message,
//           status: error.request.status,
//         })
//       )
//     );
// };
