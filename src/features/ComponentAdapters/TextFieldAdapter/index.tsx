import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { BaseAdapterProps } from "../type";
import { Field, FieldProps } from "formik";
import { textStyle } from "../mui.styles";

type Options = {
  message?: string;
};

type Props = Options & BaseAdapterProps & TextFieldProps;

type ComponentProps = Props & FieldProps;

const TextFieldComponent = React.memo<ComponentProps>((props) => {
  const {
    id,
    label,
    type,
    form: { errors, touched },
    error = false,
    message = "Required field",
    field,
    ...rest
  } = props;
  
  return (
    <>
      <TextField
        error={!!(errors[field.name] && touched[field.name])}
        helperText={
          !!(errors[field.name] && touched[field.name]) ? (errors[field.name] as string)  : ""
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
