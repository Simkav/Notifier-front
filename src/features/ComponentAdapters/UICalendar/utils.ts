import { currentDateType } from "../../Main/constants";
import { format, getDaysInMonth } from "date-fns";

const daysOnScreen = 42;

export const showDays = ({ month, year }: currentDateType) => {
  const currentMonthDaysCount = getDaysInMonth(new Date(year, month));

  const prevMonthDaysCount = getDaysInMonth(new Date(year, month - 1));

  const firstDayOfMonth = Number(format(new Date(year, month, 1), "i"));

  const previousMonthDays = new Array(firstDayOfMonth)
    .fill(null)
    .map((_, i) => ({
      currentMonth: false,
      day: prevMonthDaysCount - i,
      id: Math.random(),
    }))
    .reverse();

  // TODO привести к датам и проверять на isBefore,дизейблить прошедшие даты
  const thisMothDays = new Array(currentMonthDaysCount)
    .fill(null)
    .map((_, i) => ({
      currentMonth: true,
      day: i + 1,
      id: Math.random(),
    }));

  const nextMothDays = new Array(
    daysOnScreen - currentMonthDaysCount - firstDayOfMonth > 0
      ? daysOnScreen - currentMonthDaysCount - firstDayOfMonth
      : 0
  )
    .fill(null)
    .map((_, i) => ({
      currentMonth: false,
      day: i + 1,
      id: Math.random(),
    }));

  const daysToShow = [...previousMonthDays, ...thisMothDays, ...nextMothDays];
  const skeletonDays = Array(daysOnScreen).fill(null);

  return { daysToShow, skeletonDays };
};
