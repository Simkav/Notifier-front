import React from "react";
import axios from "axios";
import { FormikValues } from "formik";
import { authEnum } from "./types";

export const handlAuth = (values: FormikValues, action: authEnum) => {
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
    .then((response) => "ok")
    .catch((error) => " error");
};
