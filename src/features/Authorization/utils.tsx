import { Maybe } from "yup/es/types";

export const getEmailName = (email: Maybe<string>) => email?.split("@")[0];
