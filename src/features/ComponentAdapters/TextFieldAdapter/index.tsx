import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { BaseAdapterProps } from "../type";
import { Field, FieldProps } from "formik";
import { defaultErrorMessage } from "./constants";
import { textStyle } from "../mui.styles";

type Optins = {
  errorMessage?: string;
};

type Props = Optins & BaseAdapterProps & TextFieldProps;

type ComponentProps = Props & FieldProps;

const TextFieldComponent = React.memo<ComponentProps>((props) => {
  const {
    id,
    label,
    type,
    form: { errors, touched },
    error = false,
    errorMessage = "Required field",
    field,
    ...rest
  } = props;

  const errorText = defaultErrorMessage[field.name] ?? errorMessage;

  return (
    <>
      <TextField
        error={!!(errors[field.name] && touched[field.name])}
        helperText={
          !!(errors[field.name] && touched[field.name]) ? errorText : ""
        }
        id={id}
        label={label}
        sx={textStyle}
        type={type}
        variant="filled"
        {...field}
        {...rest}
      />
    </>
  );
});

export const TextFieldAdapter = React.memo<Props>((props) => {
  const { name, ...rest } = props;

  return <Field component={TextFieldComponent} name={name} {...rest} />;
});

TextFieldComponent.displayName = "TextFieldComponent";
TextFieldAdapter.displayName = "TextFieldAdapter";
