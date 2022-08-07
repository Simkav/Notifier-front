import { Maybe } from "yup/es/types";
import { ErrorType } from "../../types";

export type userType = {
  userEmail: Maybe<string>;
  jwt: Maybe<string>;
  error: ErrorType;
};

export const initialState: userType = {
  userEmail: null,
  error: {
    code: null,
    message: null,
    status: null,
  },
  jwt: null,
};
