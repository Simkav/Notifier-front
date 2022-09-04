import React, { FC, useEffect, useState } from "react";
import cn from "classnames";
import css from "./index.module.scss";
import { Badge } from "@mui/material";
import { daysOnScreenType } from "../UICalendar/types";

type Props = {
  day: daysOnScreenType;
  isCurrentUser: boolean;
  handleClick: (day: daysOnScreenType) => void;
};

const DayInCalendar: FC<Props> = ({ day, isCurrentUser, handleClick }) => {
  const { currentMonthAndNotPast, day: dayNumber, id } = day;

  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const isCursorOverDay = document?.getElementById(`${id}`);

    isCursorOverDay?.addEventListener("mouseover", (_) => {
      setIsHover(true);
    });

    isCursorOverDay?.addEventListener("mouseout", (_) => {
      setIsHover(false);
    });
  }, []);


  return (
    <Badge
      badgeContent={currentMonthAndNotPast ? day?.notifications?.length : 0}
      color="secondary"
      sx={{
        "& .MuiBadge-badge": {
          color: "lightgrey",
        },
      }}
      variant={isHover ? "standard" : "dot"}
    >
      <div
        className={cn(
          css.dateContainer,
          currentMonthAndNotPast ? [css.thisMonth] : [css.notThisMonth],
          !!day?.notifications?.length ? css.activeDay : "null"
        )}
        id={id}
        onClick={() => {
          currentMonthAndNotPast && isCurrentUser ? handleClick(day) : null;
        }}
      >
        {dayNumber}
      </div>
    </Badge>
  );
};

export default DayInCalendar;
