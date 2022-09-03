import AlertAdapter from "../ComponentAdapters/AlertAdapter";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HelpingText from "../HelpingText";
import React, { FC, useCallback, useEffect, useState } from "react";
import UICalendar from "../UICalendar";
import axios, { AxiosError } from "axios";
import css from "./index.module.scss";
import getMonth from "date-fns/getMonth";
import { Maybe } from "yup/es/types";
import { UIModal } from "../UIModal";
import { helpingText, monthEnum } from "./constants";
import { useAppSelector } from "../../service/store";
import { useQuery } from "@tanstack/react-query";

const Main: FC = () => {
  const [isOpenAlert, setOpenAlert] = useState<boolean>(false);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [day, setDay] = useState<Maybe<any>>(null);

  const userToken: Maybe<string> = useAppSelector(
    (state) => state.currentUserReducer.jwt
  );

  const isCurrentUser = !!userToken;

  const notesUrl = new URL(process.env.REACT_APP_NOTE_URL!).href;

  const { isLoading, error,  } = useQuery(
    ["notes", userToken],
    async () => {
      await axios
        .get(notesUrl, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => response)
        .catch((_) => setOpenAlert(true))
        .finally(() => "return");
    },
    {
      enabled: isCurrentUser,
      retry: false,
    }
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
          isCurrentUser={isCurrentUser}
          isLoading={isLoading}
          setDay={setDay}
          setOpenModal={setOpenModal}
        />
      </div>
      <UIModal day={day} isOpen={isOpenModal} setOpen={setOpenModal} />
      <AlertAdapter
        footerMessage={"CAN'T GET NOTIFICATIONS FROM SERVER"}
        message={(error as AxiosError)?.message}
        open={isOpenAlert}
        setOpenAlert={setOpenAlert}
      />
    </>
  );
};

export default Main;
