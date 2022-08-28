import * as Yup from "yup";
import {  createNotificationType } from "./types";

export const notificationValidationSchema = Yup.object()
  .shape({
    [createNotificationType.text]: Yup.string().required(),
    [createNotificationType.from]: Yup.string().required(),
    [createNotificationType.interval.type]: Yup.string().required(),
    [createNotificationType.interval.value]: Yup.string().required(),

  })
  .defined();

export const initialValues: typeof notificationValidationSchema = {
  from: "",
  interval: {
    type: "",
    value: "",
  },
  text: "",
};
