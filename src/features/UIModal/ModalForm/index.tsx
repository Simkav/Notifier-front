import Label from "../../FormLabel";
import React, { FC } from "react";
import axios from "axios";
import css from "./index.module.scss";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { Maybe } from "yup/es/types";
import { QueryObserverResult, useMutation } from "@tanstack/react-query";
import { TextFieldAdapter } from "../../ComponentAdapters/TextFieldAdapter";
import { TimePickerAdapter } from "../../ComponentAdapters/TimePickerAdapter";
import { createNotificationType } from "./types";
import { daysOnScreenType } from "../../Main/UICalendar/types";
import { initialValues, notificationValidationSchema } from "./validation";
import { intervalTypeValues } from "./constants";
import { setHours } from "date-fns";
import { useAppSelector } from "../../../service/store";

type Props = {
  setOpenModal: (value: ((prevState: boolean) => boolean) | boolean) => void;
  refetch: () => Promise<QueryObserverResult<any>>;
  chosenDay: daysOnScreenType;
};

const ModalForm: FC<Props> = ({ setOpenModal, refetch, chosenDay }) => {
  const userToken: Maybe<string> = useAppSelector(
    (state) => state.currentUserReducer.jwt
  );
  const [day, month, year] = chosenDay?.id.split("/").map((el) => Number(el));
  console.log(chosenDay);

  const getStartDataOfNotification = (data: Date) => {
    const hours = data.getHours();
    const minutes = data.getMinutes();

    return setHours(new Date(year, month, day), hours).setMinutes(minutes);
  };

  const handleCreateNotification = useMutation(
    (notificationData: typeof notificationValidationSchema) => {
      return axios
        .post(
          String(process.env.REACT_APP_NOTE_URL),
          {
            ...notificationData,
            from: getStartDataOfNotification(new Date(notificationData.from)),
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((_) => refetch());
    }
  );
  const { mutate, isLoading } = handleCreateNotification;

  const handleSubmit = async (values: any) => {
    await mutate(values);
    setOpenModal(false);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount={true}
      validationSchema={notificationValidationSchema}
    >
      {({ values, handleChange, setFieldValue, isValid, dirty }) => (
        <>
          <div className={css.container}>
            <Label> We will send notifications every </Label>
            <div className={css.blockContainer}>
              <div className={css.interval}>
                <TextFieldAdapter
                  isNumberField={true}
                  maxLength={3}
                  name={"interval.value"}
                  sx={{ width: "60px" }}
                  variant="standard"
                />
                <RadioGroup
                  row
                  name={"interval.type"}
                  onChange={handleChange}
                  value={values.interval.type}
                >
                  <FormControlLabel
                    checked={values.interval.type === intervalTypeValues.days}
                    className={
                      values.interval.type === intervalTypeValues.days
                        ? css.activeRadio
                        : css.radio
                    }
                    control={<Radio />}
                    label="Days"
                    value={intervalTypeValues.days}
                  />
                  <FormControlLabel
                    checked={values.interval.type === intervalTypeValues.weeks}
                    className={
                      values.interval.type === intervalTypeValues.weeks
                        ? css.activeRadio
                        : css.radio
                    }
                    control={<Radio />}
                    label="Weeks"
                    value={intervalTypeValues.weeks}
                  />
                  <FormControlLabel
                    checked={values.interval.type === intervalTypeValues.months}
                    className={
                      values.interval.type === intervalTypeValues.months
                        ? css.activeRadio
                        : css.radio
                    }
                    control={<Radio />}
                    label="Months"
                    value={intervalTypeValues.months}
                  />
                </RadioGroup>
              </div>
            </div>
            <div className={css.blockContainer}>
              <Label> They will be sent at </Label>
              <TimePickerAdapter
                name={createNotificationType.from}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className={css.blockContainer}>
              <Label> With the text</Label>
              <TextFieldAdapter
                label={"Notification text"}
                maxLength={300}
                multiline={true}
                name={createNotificationType.text}
                rows={4}
                variant={"outlined"}
              />
            </div>
          </div>
          <LoadingButton
            className={css.submitButton}
            disabled={!isValid && dirty}
            loading={isLoading}
            onClick={() => handleSubmit(values)}
            type="submit"
            variant="outlined"
          >
            Create Notification
          </LoadingButton>
        </>
      )}
    </Formik>
  );
};

export default ModalForm;
