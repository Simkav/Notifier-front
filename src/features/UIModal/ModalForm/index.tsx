import Label from "../../FormLabel";
import React from "react";

import css from "./index.module.scss";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { TextFieldAdapter } from "../../ComponentAdapters/TextFieldAdapter";
import { TimePickerAdapter } from "../../ComponentAdapters/TimePickerAdapter";
import { createNotificationType } from "./types";
import { initialValues, notificationValidationSchema } from "./validation";

const ModalForm = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount={true}
      validationSchema={notificationValidationSchema}
    >
      {({ values, handleChange, setFieldValue, isValid,dirty, errors }) => (
        <>
          <div className={css.container}>
            <Label> We will send notifications every : </Label>
            <div className={css.blockContainer}>
              <div className={css.interval}>
                <TextFieldAdapter
                  isNumberField={true}
                  maxLength={3}
                  name={createNotificationType.interval.value}
                  sx={{ width: "60px" }}
                  variant="standard"
                />
                <RadioGroup
                  row
                  name={createNotificationType.interval.type}
                  onChange={handleChange}
                  value={values.interval.type}
                >
                  <FormControlLabel
                    checked={createNotificationType.interval.type === "days"}
                    className={
                      values.interval.type === "days"
                        ? css.activeRadio
                        : css.radio
                    }
                    control={<Radio />}
                    label="Day"
                    value="days"
                  />
                  <FormControlLabel
                    checked={values.interval.type === "weeks"}
                    className={
                      values.interval.type === "weeks"
                        ? css.activeRadio
                        : css.radio
                    }
                    control={<Radio />}
                    label="Week"
                    value="weeks"
                  />
                  <FormControlLabel
                    checked={values.interval.type === "months"}
                    className={
                      values.interval.type === "months"
                        ? css.activeRadio
                        : css.radio
                    }
                    control={<Radio />}
                    label="Month"
                    value="months"
                  />
                </RadioGroup>
              </div>
              <Label> They will be sent at : </Label>
              <TimePickerAdapter
                name={createNotificationType.from}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className={css.blockContainer}>
              <Label> Whit the text : </Label>
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
            onClick={() => console.log(errors, values)}
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
