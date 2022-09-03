import { Maybe } from "yup/es/types";
import { notificationsFromSchemaType } from "../UIModal/ModalForm/validation";

export type notificationsOnDayType = {
  id: string;
};

export type daysOnScreenType = {
  currentMonthAndNotPast: Maybe<boolean>;
  day: Maybe<number>;
  id: Maybe<string>;
  notificationsOnDay: Maybe<notificationsOnDayType>;
};

export type getNotificationsType = {
  next: string;
  user: string;
  id: string;
};


export type NotificationsType = getNotificationsType & notificationsFromSchemaType