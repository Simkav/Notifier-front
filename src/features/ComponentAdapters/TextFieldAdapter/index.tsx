import NumberFormat, { InputAttributes } from "react-number-format";
import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { BaseAdapterProps } from "../type";
import { Field, FieldProps } from "formik";
import { textStyle } from "../mui.styles";

type Options = {
  message?: string;
  isNumberField?: boolean;
  maxLength?: number;
};

type Props = Options & BaseAdapterProps & TextFieldProps;

type ComponentProps = Props & FieldProps;

// TODO убрать ошибку из консоли,посмотреть,как прокидываются рефы

const NumberFormatCustom = (props: any) => {
  const { name, maxLength, ...other } = props;

  return (
    <NumberFormat
      {...other}
      allowNegative={false}
      maxLength={maxLength}
      name={name}
      style={{ textAlign: "center" }}
    />
  );
};

const TextFieldComponent = React.memo<ComponentProps>((props) => {
  const {
    id,
    label,
    form: { errors, touched, values },
    message = "Required field",
    field,
    isNumberField,
    sx,
    variant = "filled",
    maxLength,
    ...rest
  } = props;

  const helpText = () => {
    if (maxLength) {
      return values[field.name]
        ? values[field.name].length + " / " + maxLength
        : 0 + " / " + maxLength;
    }

    if (errors[field.name] && touched[field.name]) {
      return errors[field.name] as string;
    }

    return "";
  };

  return (
    <>
      <TextField
        InputProps={
          isNumberField
            ? {
                inputComponent: NumberFormatCustom as React.FC<InputAttributes>,
              }
            : {}
        }
        color={
          !!(errors[field.name] && touched[field.name]) ? "error" : "success"
        }
        error={!!(errors[field.name] && touched[field.name])}
        helperText={helpText()}
        id={id}
        inputProps={{
          maxLength: [maxLength],
        }}
        label={label}
        sx={sx ?? textStyle}
        variant={variant}
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
