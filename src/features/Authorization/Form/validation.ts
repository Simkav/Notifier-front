import * as Yup from "yup";
import { userFields } from "../types";

export const validationSchema = Yup.object().shape({
  [userFields.email]: Yup.string()
    .required()
    .email()
    .nullable()
    .min(6, "Must be at least 6 characters long"),
  [userFields.password]: Yup.string()
    .required()
    .nullable()
    .min(6, "Must be at least 6 characters long"),
  [userFields.repeatPassword]: Yup.string()
    .required()
    .nullable()
    .min(6, "Must be at least 6 characters long")
    .optional(),
});

export const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
};
