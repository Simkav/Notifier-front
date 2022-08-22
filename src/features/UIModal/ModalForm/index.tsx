import React from "react";
import cn from "classnames";
import css from "./index.module.scss";
import { Field, Form, Formik } from "formik";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const ModalForm = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Formik initialValues={{ interval: { type: "" } }} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <div>
          <RadioGroup
            row
            name={"interval.type"}
            onChange={handleChange}
            value={values.interval.type}
          >
            <FormControlLabel
              checked={values.interval.type === "days"}
              className={
                values.interval.type === "days" ? css.activeRadio : css.radio
              }
              control={<Radio />}
              label="Day"
              value="days"
            />
            <FormControlLabel
              checked={values.interval.type === "weeks"}
              className={
                values.interval.type === "weeks" ? css.activeRadio : css.radio
              }
              control={<Radio />}
              label="Week"
              value="weeks"
            />
            <FormControlLabel
              checked={values.interval.type === "months"}
              className={
                values.interval.type === "months" ? css.activeRadio : css.radio
              }
              control={<Radio />}
              label="Month"
              value="months"
            />
          </RadioGroup>
          <button onClick={() => console.log(values)}>click</button>
        </div>
      )}
    </Formik>
  );
};

export default ModalForm;
