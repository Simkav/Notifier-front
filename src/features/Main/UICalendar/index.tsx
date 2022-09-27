import DayInCalendar from "../DayInCalendar";
import React, { FC, useMemo } from "react";
import css from "./index.module.scss";
import { Maybe } from "yup/es/types";
import { NotificationsType, daysOnScreenType } from "./types";
import { Skeleton } from "@mui/material";
import { currentDateType } from "../constants";
import { daysOfWeekEnum } from "./constants";
import { showDays } from "./utils";

export type Props = {
  isCurrentUser: boolean;
  isLoading: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDay: React.Dispatch<React.SetStateAction<Maybe<any>>>;
  currentDate: currentDateType;
  notificationData: NotificationsType[];
};

const UICalendar: FC<Props> = ({
  currentDate,
  isCurrentUser,
  isLoading,
  setDay,
  setOpenModal,
  notificationData,
}) => {

  const handleClick = (day: daysOnScreenType) => {
    setOpenModal(true);
    setDay(day);
  };

  const { daysToShow, skeletonDays } = useMemo(
    () => showDays({ ...currentDate }, notificationData),
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

        {(isCurrentUser ? !isLoading && daysToShow : true)
          ? daysToShow.map((day) => (
              <DayInCalendar
                key={day.key}
                day={day}
                handleClick={handleClick}
                isCurrentUser={isCurrentUser}
              />
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
