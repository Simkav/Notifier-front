import React from "react";
import axios from "axios";
import { DispatchState } from "../../service/store";
import { FormikValues } from "formik";
import { authEnum } from "./types";
import { setCurrentUser } from "../../service/slices/currentUser/currentUser.slice";

export const handleAuth = (
  values: FormikValues,
  action: authEnum,
  dispatch: DispatchState
) => {
  const { email, password } = values;

  const authorizationUrl = new URL(
    action === "authorization"
      ? process.env.REACT_APP_SIGN_IN_URL!
      : process.env.REACT_APP_REGISTER_URL!
  ).href;

  axios
    .post(authorizationUrl, {
      email: email,
      password: password,
    })
    .then((response) => {
      const userData = response.data;
      dispatch(
        setCurrentUser({
          userEmail: userData.user.email,
          jwt: userData.tokens.access_token,
        })
      );
    })
    .catch((error) => " error");
};
