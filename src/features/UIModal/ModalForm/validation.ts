import * as Yup from "yup";
import { createNotificationType } from "./types";

export const notificationValidationSchema = Yup.object()
  .shape({
    [createNotificationType.text]: Yup.string().required(),
    [createNotificationType.from]: Yup.string().required(),
    [createNotificationType.interval]: Yup.object().shape({
      [createNotificationType.type]: Yup.string().required(),
      [createNotificationType.value]: Yup.string().required(),
    }),
  })
  .defined();

export type NotificationsFromSchemaType = typeof notificationValidationSchema;

export const initialValues: typeof notificationValidationSchema = {
  from: "",
  interval: {
    type: "",
    value: "",
  },
  text: "",
};
