import {Maybe} from "yup/es/types";

export type userType = {
  userEmail: Maybe<string>;
  jwt: Maybe<string>;
};

export const initialState : userType = {
  userEmail: null,
  jwt: null,
};

