import AlertAdapter from "../ComponentAdapters/AlertAdapter";
import FormTabs from "./FormTabs";
import React, { FC, useState } from "react";
import css from "./index.module.scss";
import { Formik, FormikValues } from "formik";
import { LoadingButton } from "@mui/lab";
import { TextFieldAdapter } from "../ComponentAdapters/TextFieldAdapter";
import { UserType } from "../../service/slices/currentUser/types";
import {
  authValidationSchema,
  initialValues,
  registerValidationSchema,
} from "./Form/validation";
import { buttonStyle } from "../ComponentAdapters/mui.styles";
import { fetchUser } from "../../service/slices/currentUser/currentUser.async";
import { formEnum, userFields } from "./types";
import { formNames, isRegistration } from "./Form/constants";
import { isDisabledButton } from "./Form/utils";
import { useAppDispatch, useAppSelector } from "../../service/store";
import { useNavigate } from "react-router-dom";

export const AuthorizationForm: FC = () => {
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

  const [formType, setFormType] = useState<formEnum>(formEnum.authorization);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validationSchema={
          isRegistration[formType]
            ? registerValidationSchema
            : authValidationSchema
        }
      >
        {({ handleSubmit, isValid, values, resetForm }) => (
          <>
            <FormTabs
              formType={formType}
              resetForm={resetForm}
              setFormType={setFormType}
              values={values}
            />
            <div className={css.container}>
              <div className={css.formWidth}>
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
                  onClick={() => {
                    handleSubmit();
                  }}
                  sx={buttonStyle}
                  type="submit"
                  variant="outlined"
                >
                  {formNames[formType]}
                </LoadingButton>
              </div>{" "}
            </div>
          </>
        )}
      </Formik>
      <AlertAdapter
        open={isOpenModal}
        request={request}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
