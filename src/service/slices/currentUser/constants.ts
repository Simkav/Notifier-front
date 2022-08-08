import { Maybe } from "yup/es/types";
import { ErrorType, requestType } from "../../types";

export type userType = {
  userEmail: Maybe<string>;
  jwt: Maybe<string>;
  error: ErrorType;
  request: requestType;
};

export const initialState: userType = {
  userEmail: null,
  jwt: null,
  error: {
    code: null,
    message: null,
    status: null,
  },
  request: {
    codeMessage: null,
    message: null,
    status: null,
    pending: null,
  },
};
