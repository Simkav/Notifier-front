import { FormikValues } from "formik";
import { authEnum } from "../types";
import { isRegistration } from "./constants";

export const isDisabledButton = (values: FormikValues, whichForm: authEnum) => {
  const { email, password, repeatPassword } = values;

  const disableOnRegistration = !(!!email && !!password && !!repeatPassword);

  const disableOnAuthorization = !(!!email && !!password);

  return isRegistration[whichForm]
    ? disableOnRegistration
    : disableOnAuthorization;
};
