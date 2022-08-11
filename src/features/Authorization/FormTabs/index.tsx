import React, { Dispatch, FC } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import css from "./index.module.scss";
import { FormikState, FormikValues } from "formik";
import { formEnum } from "../types";
import { initialValues } from "../Form/validation";

type Props = {
  formType: formEnum;
  setFormType: Dispatch<formEnum>;
  resetForm: (
    nextState?: Partial<FormikState<FormikValues>> | undefined
  ) => void;
  values: FormikValues;
};

const FormTabs: FC<Props> = ({ formType, setFormType, resetForm, values }) => {
  const handleChange = () => {
    resetForm({
      values: {
        ...initialValues,
        email: values.email,
      },
    } as FormikValues);
  };

  return (
    <Tabs
      centered
      className={css.tabs}
      onChange={handleChange}
      textColor="primary"
      value={formType}
    >
      <Tab
        label={formEnum.authorization}
        onClick={() => setFormType(formEnum.authorization)}
        value={formEnum.authorization}
      />
      <Tab
        label={formEnum.registration}
        onClick={() => setFormType(formEnum.registration)}
        value={formEnum.registration}
      />
    </Tabs>
  );
};

export default FormTabs;
