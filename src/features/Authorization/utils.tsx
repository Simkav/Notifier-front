import React from "react";
import axios from "axios";
import { userEnum, userType } from "./types";

export const handleSubmit = (values: userType, action: userEnum) => {
  const { userEmail, userPassword } = values;
console.log(123)
  const authorizationUrl = new URL(
    action === "authorization"
      ? process.env.REACT_APP_SIGN_IN_URL!
      : process.env.REACT_APP_SIGN_IN_URL!
  ).href;

  axios
    .post(authorizationUrl, {
      email: userEmail,
      password: userPassword,
    })
    .then((response) => <div>ok</div>)
    .catch((error) => <div>error</div>);
};
