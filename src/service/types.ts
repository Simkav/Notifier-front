import { Maybe } from "yup/es/types";

export type ErrorType = {
  code: Maybe<string>;
  message: Maybe<string>;
  status: Maybe<number>;
};

export type requestType = {
  codeMessage: Maybe<string>;
  message: Maybe<string>;
  status: Maybe<number>;
  pending: Maybe<boolean>;
}
