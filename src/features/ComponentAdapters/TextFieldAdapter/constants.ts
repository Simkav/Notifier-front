import { userFields } from "../../Authorization/types";

export const defaultErrorMessage: Record<string, string> = {
  [userFields.email]: "Enter correct email",
  [userFields.password]:
    "Password must be at least 6 characters with at least one capital letter and one number",
  [userFields.repeatPassword]: "Repeated password is not equal to password",
};
