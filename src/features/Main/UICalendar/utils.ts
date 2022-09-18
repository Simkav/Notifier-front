import { NotificationsType } from "./types";
import {
  addDays,
  differenceInCalendarDays,
  format,
  getDaysInMonth,
  isBefore,
} from "date-fns";
import { currentDateType } from "../constants";
import { intervalTypeValues } from "../../UIModal/ModalForm/constants";
import { v4 as uuid } from "uuid";

const daysOnScreen = 42;

export const showDays = (
  { month, year }: currentDateType,
  notificationsData: NotificationsType[]
) => {
  const currentMonthDaysCount = getDaysInMonth(new Date(year, month));

  const prevMonthDaysCount = getDaysInMonth(new Date(year, month - 1));

  const firstDayOfMonth = Number(format(new Date(year, month, 0), "i"));

  // UUID для правильной анимации при смене месяца(в ущерб рендеру)

  const previousMonthDays = new Array(firstDayOfMonth)
    .fill(null)
    .map((_, i) => ({
      currentMonthAndNotPast: false,
      day: prevMonthDaysCount - i,
      id: `${prevMonthDaysCount - i + "/" + (month - 1) + "/" + year}`,
      key: uuid(),
    }))
    .reverse();

  const thisMonthDays = new Array(currentMonthDaysCount)
    .fill(null)
    .map((_, i) => {
      const notificationsThisDay: NotificationsType[] = [];

      const chosenDayDate = new Date(year, month, i + 1);

      notificationsData?.map((note) => {
        const convertedNoteDate = new Date(note.from);

        if (isBefore(addDays(chosenDayDate, 1), convertedNoteDate)) {
          return;
        }

        if (note.interval.type === intervalTypeValues.days) {
          if (
            differenceInCalendarDays(chosenDayDate, convertedNoteDate) %
              note.interval.value ===
            0
          ) {
            notificationsThisDay.push(note);
          }
        }

        if (note.interval.type === intervalTypeValues.weeks) {
          if (
            differenceInCalendarDays(chosenDayDate, convertedNoteDate) %
              (7 * note.interval.value) ===
            0
          ) {
            notificationsThisDay.push(note);
          }
        }

        if (note.interval.type === intervalTypeValues.months) {
          if (
            chosenDayDate.getDate() === convertedNoteDate.getDate() &&
            Math.abs(convertedNoteDate.getMonth() - chosenDayDate.getMonth()) %
              note.interval.value ===
              0
          ) {
            notificationsThisDay.push(note);
          }
        }
      });

      return {
        currentMonthAndNotPast: !isBefore(
          new Date(year, month, i + 2),
          new Date()
        ),
        day: i + 1,
        id: `${i + 1 + "/" + month + "/" + year}`,
        key: uuid(),
        notifications: notificationsThisDay,
      };
    });

  const nextMothDays = new Array(
    daysOnScreen - currentMonthDaysCount - firstDayOfMonth > 0
      ? daysOnScreen - currentMonthDaysCount - firstDayOfMonth
      : 0
  )
    .fill(null)
    .map((_, i) => ({
      currentMonthAndNotPast: false,
      day: i + 1,
      id: `${i + 1 + "/" + (month + 1) + "/" + year}`,
      key: uuid(),
    }));

  const daysToShow = [...previousMonthDays, ...thisMonthDays, ...nextMothDays];

  const skeletonDays = Array(daysOnScreen).fill(null);

  return { daysToShow, skeletonDays };
};
