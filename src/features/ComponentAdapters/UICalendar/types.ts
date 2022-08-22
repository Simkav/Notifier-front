import { Maybe } from "yup/es/types";

export type notificationsOnDayType = {
  id: string;
};

export type daysOnScreenType = {
  currentMonthAndNotPast: Maybe<boolean>;
  day: Maybe<number>;
  id: Maybe<string>;
  notificationsOnDay: Maybe<notificationsOnDayType>;
};
