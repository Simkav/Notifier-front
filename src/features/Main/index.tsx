import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HelpingText from "../HelpingText";
import React, { FC, useCallback, useState } from "react";
import UICalendar from "../ComponentAdapters/UICalendar";
import css from "./index.module.scss";
import getMonth from "date-fns/getMonth";
import { Maybe } from "yup/es/types";
import { helpingText, monthEnum } from "./constants";
import { useAppSelector } from "../../service/store";

const Main: FC = () => {
  const isCurrentUser: Maybe<string> = useAppSelector(
    (state) => state.currentUserReducer.jwt
  );

  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const [currentMonth, setCurrentMonth] = useState<number>(
    getMonth(new Date())
  );

  const handleAddMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }, [currentYear, currentMonth]);

  const handleRemoveMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }, [currentYear, currentMonth]);

  return (
    <>
      {!isCurrentUser && <HelpingText text={helpingText} />}
      <div className={css.container}>
        <div className={css.calendarHead}>
          <ArrowBackIosNewIcon
            className={css.arrow}
            onClick={handleRemoveMonth}
          />
          <p className={css.calendarHeadText}>
            {monthEnum[currentMonth]}&nbsp;{currentYear}
          </p>
          <ArrowForwardIosIcon className={css.arrow} onClick={handleAddMonth} />
        </div>
        <UICalendar
          currentDate={{ month: currentMonth, year: currentYear }}
          isCurrentUser={!!isCurrentUser}
        />
      </div>
    </>
  );
};

export default Main;
