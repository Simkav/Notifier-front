import * as Yup from "yup";
import { userFields } from "../types";

export const authValidationSchema = Yup.object()
  .shape({
    [userFields.email]: Yup.string()
      .nullable()
      .required("Email is required")
      .email("Enter correct email")
      .min(6, "Must be at least 6 characters long"),
    [userFields.password]: Yup.string()
      .nullable()
      .required("Password is required")
      .min(6, "Must be at least 6 characters long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
      "Must Contain One Uppercase, One Lowercase, One Number character"
    )
  })
  .defined();

export const registerValidationSchema = authValidationSchema.clone().shape({
    [userFields.repeatPassword]: Yup.string()
        .nullable()
        .required("Repeated your password")
        .test(
            "passwords equal",
            "Repeated password is not equal to password",
            function test(value) {
                console.log(value, this.parent);

                return value === this.parent["password"];
            }
        ),
})

export type AnalyticalReportsValues = Yup.InferType<typeof registerValidationSchema>;

export const initialValues: AnalyticalReportsValues = {
  email: "",
  password: "",
  repeatPassword: "",
};
