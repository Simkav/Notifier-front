import React, { FC } from "react";
import css from "./index.module.scss";
import { Button } from "@mui/material";
import { Formik, FormikValues } from "formik";
import { TextFieldAdapter } from "../../ComponentAdapters/TextFieldAdapter";
import { authEnum, userFields } from "../types";
import { buttonStyle } from "../../ComponentAdapters/mui.styles";
import { formNames, showRepeat } from "./constants";
import { handlAuth } from "../utils";
import { initialValues,validationSchema } from "./validation";

type Props = {
  whichForm: authEnum;
};

export const AuthorizationForm: FC<Props> = ({ whichForm }) => {
  const handleSubmit = (values: FormikValues) => {
    handlAuth(values, whichForm);
    console.log(values)

  };

  return (
    <div className={css.container}>
      <div className={css.formWidth}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({handleSubmit }) => (
            <>
              <TextFieldAdapter
                id={userFields.email}
                label={"Email"}
                name={userFields.email}
              />

              <TextFieldAdapter
                id={userFields.password}
                label={"Password"}
                name={userFields.password}
                type="password"
              />
              {showRepeat[whichForm] && (
                <TextFieldAdapter
                  id={userFields.repeatPassword}
                  label={"Repeat Password"}
                  name={userFields.repeatPassword}
                  type="password"
                />
              )}
              <Button
                disableElevation
                onClick={() => handleSubmit()}
                sx={buttonStyle}
                type="submit"
                variant="outlined"
              >
                {formNames[whichForm]}
              </Button>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};
