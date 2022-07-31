export enum userEnum {
  authorization = "authorization",
  registration = "registration",
}

export const userActions = {
  authorization: "authorization",
  registration: "registration",
};

export interface userType  {
  userEmail: string;
  userPassword: string;
  userRepeatPassword?: string;
}