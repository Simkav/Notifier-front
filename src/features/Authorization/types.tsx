export enum authEnum {
  authorization = "authorization",
  registration = "registration",
}
export interface userType {
  email: string;
  password: string;
  repeatPassword?: string;
}

export enum userFields {
  email = "email",
  password = "password",
  repeatPassword = "repeatPassword",
}

