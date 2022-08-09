import { FormikValues } from "formik";
import axios from "axios";
import { formEnum } from "../../../features/Authorization/types";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUser = createAsyncThunk(
  "currentUser/fetchUser",
  (payload: { currentUser: FormikValues; formType: formEnum }) => {
    const { email, password } = payload.currentUser;

    const authorizationUrl = new URL(
      payload.formType === "authorization"
        ? process.env.REACT_APP_SIGN_IN_URL!
        : process.env.REACT_APP_REGISTER_URL!
    ).href;

    return axios
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
      })

  }
);
