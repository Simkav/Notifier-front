import AlertAdapter from "../ComponentAdapters/AlertAdapter";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HelpingText from "../HelpingText";
import React, { FC, useCallback, useEffect, useState } from "react";
import UICalendar from "../ComponentAdapters/UICalendar";
import axios, { AxiosError } from "axios";
import css from "./index.module.scss";
import getMonth from "date-fns/getMonth";
import { Maybe } from "yup/es/types";
import { helpingText, monthEnum } from "./constants";
import { useAppSelector } from "../../service/store";
import { useQuery } from "@tanstack/react-query";

const Main: FC = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const userToken: Maybe<string> = useAppSelector(
    (state) => state.currentUserReducer.jwt
  );

  const isCurrentUser = !!userToken;

  const notesUrl = new URL(process.env.REACT_APP_NOTE_URL!).href;

  const { isLoading, data, error } = useQuery(
    ["notes", userToken],
    async () => {
      await axios
        .get(notesUrl, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => res.data);
    },
    {
      enabled: isCurrentUser,
      retry: false,
    }
  );

  useEffect(() => {
    if (error) {
      setOpenModal(true);
    }
  }, [error]);

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
          data={data}
          error={error}
          isCurrentUser={isCurrentUser}
          isLoading={isLoading}
        />
      </div>
      <AlertAdapter
        footerMessage={"CAN'T GET NOTIFICATIONS FROM SERVER"}
        message={(error as AxiosError)?.message}
        open={isOpenModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default Main;
