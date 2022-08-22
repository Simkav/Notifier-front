import React, { FC, useMemo, useState } from "react";
import cn from "classnames";
import css from "./index.module.scss";
import { Maybe } from "yup/es/types";
import { Skeleton } from "@mui/lab";
import {currentDateType} from "../../Main/constants";
import { daysOfWeekEnum } from "./constants";
import { daysOnScreenType } from "./types";
import { showDays } from "./utils";

export type Props = {
  isCurrentUser: boolean;
  currentDate: currentDateType;
};

const UICalendar: FC<Props> = ({ currentDate, isCurrentUser }) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [day, setDay] = useState<Maybe<daysOnScreenType>>(null);

  // const handleClick = (day: daysOnScreenType) => {
  const handleClick = (day: any) => {
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

        {daysToShow
          ? daysToShow.map((el) => (
              <div
                key={el.id}
                className={cn(
                  css.dateContainer,
                  el.currentMonth ? [css.thisMonth] : [css.notThisMonth]
                )}
                onClick={() => {
                  el.currentMonth && isCurrentUser ? handleClick(el) : null;
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
      {isOpenModal && <div>Открыл модалку</div>}
    </div>
  );
};

export default UICalendar;
