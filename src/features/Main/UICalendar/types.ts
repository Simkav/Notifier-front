import { notificationsFromSchemaType } from "../../UIModal/ModalForm/validation";



export type daysOnScreenType = {
  currentMonthAndNotPast: boolean;
  day: number;
  id: string;
  notifications?: NotificationsType[];
};

export type getNotificationsType = {
  next: string;
  user: string;
  id: string;
};

export type NotificationsType = getNotificationsType &
  notificationsFromSchemaType;
