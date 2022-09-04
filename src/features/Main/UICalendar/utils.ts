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

  const firstDayOfMonth = Number(format(new Date(year, month, 1), "i")) - 1;

  // UUID для правильной анимации при смене месяца
    // TODO пофиксить багу с выводом нотификаций(показываются на месяц позже)

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

      const currentDayDate = new Date(year, month, i + 1);

      notificationsData?.map((note) => {
        const convertedNoteDate = new Date(note.from);

        if (isBefore(addDays(currentDayDate, 1), convertedNoteDate)) {
          return;
        }

        if (note.interval.type === intervalTypeValues.days) {
          if (
            differenceInCalendarDays(currentDayDate, convertedNoteDate) %
              note.interval.value ===
            0
          ) {
            notificationsThisDay.push(note);
          }
        }

        if (note.interval.type === intervalTypeValues.weeks) {


          if (note.interval.type === intervalTypeValues.weeks) {
            const dayOfWeekOfNote = format(convertedNoteDate, "E");
            const currentDayOfWeek = format(currentDayDate, "E");

            console.log(
              differenceInCalendarDays(currentDayDate, convertedNoteDate)
            );
            if (
              // differenceInCalendarDays(currentDayDate, convertedNoteDate) %
              //   (7 * note.interval.value) ===
              // 0
              dayOfWeekOfNote === currentDayOfWeek
            ) {
              notificationsThisDay.push(note);
            }
          }
        }

        if (note.interval.type === intervalTypeValues.months) {
          if (
            currentDayDate.getDate() === convertedNoteDate.getDate() &&
            Math.abs(convertedNoteDate.getMonth() - currentDayDate.getMonth()) %
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
        id: `${i + 1 + "/" + (month ) + "/" + year}`,
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
