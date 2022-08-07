import { Maybe } from "yup/es/types";

export type ErrorType = {
  code: Maybe<string>;
  message: Maybe<string>;
  status: Maybe<number>;
};
