import AlertAdapter from "../../ComponentAdapters/AlertAdapter";
import React, { FC, useState } from "react";
import css from "./index.module.scss";
import { Button } from "@mui/material";
import { ErrorType } from "../../../service/types";
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
import { useAppDispatch, useAppSelector } from "../../../service/store";
import { useNavigate } from "react-router-dom";

type Props = {
  whichForm: authEnum;
};

export const AuthorizationForm: FC<Props> = ({ whichForm }) => {
  const dispatch = useAppDispatch();

  const [isOpenModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const currentUserError: ErrorType = useAppSelector(
    (state) => state.currentUserReducer.error
  );
  // проверка на то,пришел ли ответ запроса,только после этого перенаправляем
  const handleSubmit = async (values: FormikValues) => {
    console.log(await handleAuth(values, whichForm, dispatch));
    setOpenModal(!isOpenModal);

    console.log(currentUserError?.status);
    if (currentUserError?.status == 200) {
      navigate(`/user/${values.email.split("@")[0]}`);
    }
  };

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
      <AlertAdapter
        alertMessage="Вы успешно вошли!"
        error={currentUserError}
        open={isOpenModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};
