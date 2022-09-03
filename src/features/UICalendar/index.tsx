import React, { FC, useMemo } from "react";
import cn from "classnames";
import css from "./index.module.scss";
import { Maybe } from "yup/es/types";
import {NotificationsType} from "./types";
import { Skeleton } from "@mui/material";
import { currentDateType } from "../Main/constants";
import { daysOfWeekEnum } from "./constants";
import { showDays } from "./utils";

export type Props = {
  isCurrentUser: boolean;
  isLoading: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDay: React.Dispatch<React.SetStateAction<Maybe<any>>>;
  currentDate: currentDateType;
  notificationData: NotificationsType;
};

const UICalendar: FC<Props> = ({
  currentDate,
  isCurrentUser,
  isLoading,
  setDay,
  setOpenModal,
  notificationData,
}) => {
  // const handleClick = (day: daysOnScreenType) => {
    const handleClick = (day: any) => {
    console.log(day);
    setOpenModal(true);
    setDay(day);
  };

  const { daysToShow, skeletonDays } = useMemo(
    () => showDays({ ...currentDate }),
    [currentDate]
  );

  return (
    <div>
      <div className={css.container}>
        {Object.values(daysOfWeekEnum).map((day, indx) => (
          <div key={indx} className={css.header}>
            <div className={css.headerText}>{day}</div>
          </div>
        ))}

        {!isLoading && daysToShow
          ? daysToShow.map((el) => (
              <div
                key={el.key}
                className={cn(
                  css.dateContainer,
                  el.currentMonthAndNotPast
                    ? [css.thisMonth]
                    : [css.notThisMonth],
                  false ? css.activeDay : "null"
                )}
                onClick={() => {
                  el.currentMonthAndNotPast && isCurrentUser
                    ? handleClick(el)
                    : null;
                }}
              >
                {el.day}
              </div>
            ))
          : skeletonDays.map((el, indx) => (
              <Skeleton
                key={indx}
                height={50}
                variant="rectangular"
                width={50}
              />
            ))}
      </div>
    </div>
  );
};

export default UICalendar;
