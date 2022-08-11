import { FormikValues } from "formik";
import { formEnum } from "../types";
import { isRegistration } from "./constants";

export const isDisabledButton = (values: FormikValues, formType: formEnum) => {
  const { email, password, repeatPassword } = values;

  const disableOnRegistration = !(!!email && !!password && !!repeatPassword);

  const disableOnAuthorization = !(!!email && !!password);

  return isRegistration[formType]
    ? disableOnRegistration
    : disableOnAuthorization;
};
