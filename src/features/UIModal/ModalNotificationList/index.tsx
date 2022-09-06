import React, { FC } from "react";
import css from "./index.module.scss";
import { NotificationsFromSchemaType } from "../ModalForm/validation";
import { createDayName } from "../utils";
import { daysOnScreenType } from "../../Main/UICalendar/types";

type Props = {
  chosenDay: daysOnScreenType;
};

type IntervalType = {
  value: number;
  type: string;
};

const ModalNotificationList: FC<Props> = ({ chosenDay }) => {
  const { notifications } = chosenDay;

  const intervalMessage = (interval: IntervalType) => {
    // @ts-ignore
    const { value, type } = interval;

    return ` ${value} time${value !== 1 ? "'s" : ""} per ${type}`;
  };

  return (
    <div className={css.container}>
      {notifications?.map((el) => {
        return (
          <div key={el.id} className={css.notificationContainer}>
            <p>
              <span className={css.emphasise}>interval :</span>{" "}
              {intervalMessage(el.interval)}
            </p>
            <p>
              <span className={css.emphasise}>next will be on :</span>{" "}
              {createDayName(el.next)}
            </p>
            <p>
              <span className={css.emphasise}>message :</span> {el.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ModalNotificationList;
