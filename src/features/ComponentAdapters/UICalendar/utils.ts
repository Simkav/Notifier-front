import { currentDateType } from "../../Main/constants";
import { format, getDaysInMonth, isBefore } from "date-fns";

const daysOnScreen = 42;

export const showDays = ({ month, year }: currentDateType) => {
  const currentMonthAndNotPastDaysCount = getDaysInMonth(new Date(year, month));

  const prevMonthDaysCount = getDaysInMonth(new Date(year, month - 1));

  const firstDayOfMonth = Number(format(new Date(year, month, 1), "i"));

  const previousMonthDays = new Array(firstDayOfMonth)
    .fill(null)
    .map((_, i) => ({
      currentMonthAndNotPast: false,
      day: prevMonthDaysCount - i,
      id: `${prevMonthDaysCount - i + "/" + (month - 1) + "/" + year}`,
    }))
    .reverse();

  const thisMothDays = new Array(currentMonthAndNotPastDaysCount)
    .fill(null)
    .map((_, i) => ({
      currentMonthAndNotPast: !isBefore(
        new Date(year, month, i + 2),
        new Date()
      ),
      day: i + 1,
      id: `${i + 1 + "/" + month + "/" + year}`,
    }));

  const nextMothDays = new Array(
    daysOnScreen - currentMonthAndNotPastDaysCount - firstDayOfMonth > 0
      ? daysOnScreen - currentMonthAndNotPastDaysCount - firstDayOfMonth
      : 0
  )
    .fill(null)
    .map((_, i) => ({
      currentMonthAndNotPast: false,
      day: i + 1,
      id: `${i + 1 + "/" + (month + 1) + "/" + year}`,
    }));

  const daysToShow = [...previousMonthDays, ...thisMothDays, ...nextMothDays];
  const skeletonDays = Array(daysOnScreen).fill(null);

  return { daysToShow, skeletonDays };
};
