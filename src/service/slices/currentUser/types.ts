import { Maybe } from "yup/es/types";

export type requestType = {
  codeMessage: Maybe<string>;
  message: Maybe<string>;
  status: Maybe<number>;
  pending: Maybe<boolean>;
};

export type UserType = {
  userEmail: Maybe<string>;
  jwt: Maybe<string>;
  request: requestType;
};
