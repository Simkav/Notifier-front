import React, { FC } from "react";
import css from "./index.module.scss";
import { Button } from "@mui/material";
import { Formik, FormikValues } from "formik";
import { TextFieldAdapter } from "../../ComponentAdapters/TextFieldAdapter";
import { authEnum, userFields } from "../types";
import {
  authValidationSchema,
  initialValues,
  registerValidationSchema,
} from "./validation";
import { buttonStyle } from "../../ComponentAdapters/mui.styles";
import { formNames, isRegistration } from "./constants";
import { handleAuth } from "../utils";
import { isDisabledButton } from "./utils";
import { useAppDispatch } from "../../../service/store";

type Props = {
  whichForm: authEnum;
};

export const AuthorizationForm: FC<Props> = ({ whichForm }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: FormikValues) => {
   handleAuth(values, whichForm, dispatch)
  };

  // TODO set untouched try

  return (
    <div className={css.container}>
      <div className={css.formWidth}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={
            isRegistration[whichForm]
              ? registerValidationSchema
              : authValidationSchema
          }
        >
          {({ handleSubmit, isValid, values }) => (
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
              {isRegistration[whichForm] && (
                <TextFieldAdapter
                  id={userFields.repeatPassword}
                  label={"Repeat Password"}
                  name={userFields.repeatPassword}
                  type="password"
                />
              )}
              <Button
                disableElevation
                disabled={isDisabledButton(values, whichForm) || !isValid}
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
