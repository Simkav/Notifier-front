import AlertAdapter from "../../ComponentAdapters/AlertAdapter";
import React, { FC, useState } from "react";
import css from "./index.module.scss";
import { Formik, FormikValues } from "formik";
import { LoadingButton } from "@mui/lab";
import { TextFieldAdapter } from "../../ComponentAdapters/TextFieldAdapter";
import { UserType } from "../../../service/slices/currentUser/types";
import {
  authValidationSchema,
  initialValues,
  registerValidationSchema,
} from "./validation";
import { buttonStyle } from "../../ComponentAdapters/mui.styles";
import { fetchUser } from "../../../service/slices/currentUser/currentUser.async";
import { formEnum, userFields } from "../types";
import { formNames, isRegistration } from "./constants";
import { isDisabledButton } from "./utils";
import { useAppDispatch, useAppSelector } from "../../../service/store";
import { useNavigate } from "react-router-dom";

type Props = {
  formType: formEnum;
};

export const AuthorizationForm: FC<Props> = ({ formType }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { request, userEmail }: UserType = useAppSelector(
    (state) => state.currentUserReducer
  );

  // проверка на то,пришел ли ответ запроса,только после этого перенаправляем
  if (request.status == 200) {
    navigate(`/user/${userEmail?.split("@")[0]}`);
  }

  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const handleSubmit = async (values: FormikValues) => {
    await dispatch(fetchUser({ currentUser: values, formType }));

    setOpenModal(!isOpenModal);
  };

  return (
    <div className={css.container}>
      <div className={css.formWidth}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={
            isRegistration[formType]
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
              {isRegistration[formType] && (
                <TextFieldAdapter
                  id={userFields.repeatPassword}
                  label={"Repeat Password"}
                  name={userFields.repeatPassword}
                  type="password"
                />
              )}
              <LoadingButton
                disableElevation
                disabled={isDisabledButton(values, formType) || !isValid}
                loading={!!request.pending}
                onClick={() => handleSubmit()}
                sx={buttonStyle}
                type="submit"
                variant="outlined"
              >
                {formNames[formType]}
              </LoadingButton>
            </>
          )}
        </Formik>
      </div>
      <AlertAdapter
        open={isOpenModal}
        request={request}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};
