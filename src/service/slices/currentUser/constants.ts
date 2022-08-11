import {UserType} from "./types";


export const initialState: UserType = {
  userEmail: null,
  jwt: null,
  request: {
    codeMessage: null,
    message: null,
    status: null,
    pending: null,
  },
};
