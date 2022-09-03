import Label from "../../FormLabel";
import React, { FC } from "react";
import axios from "axios";
import css from "./index.module.scss";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { Maybe } from "yup/es/types";
import { TextFieldAdapter } from "../../ComponentAdapters/TextFieldAdapter";
import { TimePickerAdapter } from "../../ComponentAdapters/TimePickerAdapter";
import { createNotificationType } from "./types";
import { initialValues, notificationValidationSchema } from "./validation";
import { radioButtonsValues } from "./constants";
import { useAppSelector } from "../../../service/store";
import { useMutation } from "@tanstack/react-query";

type Props = {
  setOpenModal: (value: ((prevState: boolean) => boolean) | boolean) => void;
};

const ModalForm: FC<Props> = ({ setOpenModal }) => {
  const userToken: Maybe<string> = useAppSelector(
    (state) => state.currentUserReducer.jwt
  );

  const handleCreateNotification = useMutation(
    (notificationData: typeof notificationValidationSchema) => {
      return axios.post(
        String(process.env.REACT_APP_NOTE_URL),
        {
          ...notificationData,
          from: new Date(notificationData.from).toUTCString(),
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
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
      {({ values, handleChange, setFieldValue, isValid, dirty, errors }) => (
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
                    checked={values.interval.type === radioButtonsValues.days}
                    className={
                      values.interval.type === radioButtonsValues.days
                        ? css.activeRadio
                        : css.radio
                    }
                    control={<Radio />}
                    label="Days"
                    value={radioButtonsValues.days}
                  />
                  <FormControlLabel
                    checked={values.interval.type === radioButtonsValues.weeks}
                    className={
                      values.interval.type === radioButtonsValues.weeks
                        ? css.activeRadio
                        : css.radio
                    }
                    control={<Radio />}
                    label="Weeks"
                    value={radioButtonsValues.weeks}
                  />
                  <FormControlLabel
                    checked={values.interval.type === radioButtonsValues.months}
                    className={
                      values.interval.type === radioButtonsValues.months
                        ? css.activeRadio
                        : css.radio
                    }
                    control={<Radio />}
                    label="Months"
                    value={radioButtonsValues.months}
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
