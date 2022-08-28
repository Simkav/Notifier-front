import React, { useEffect } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { BaseAdapterProps } from "../type";
import { Field, FieldProps } from "formik";
import { TimePicker } from "@mui/x-date-pickers";

type Options = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

type Props = Options & BaseAdapterProps & TextFieldProps;

type ComponentProps = Props & FieldProps;

const TimePickerComponent = React.memo<ComponentProps>((props) => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const { setFieldValue } = props;

  useEffect(() => {
    setFieldValue(props.field.name, new Date().toUTCString());
  }, []);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);

    setFieldValue(
      props.field.name,
      (newValue ? newValue : value)?.toUTCString()
    );
  };

  return (
    <TimePicker
      label="Pick time"
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} />}
      value={value}
    />
  );
});

export const TimePickerAdapter = React.memo<Props>((props) => {
  const { name, ...rest } = props;

  return <Field component={TimePickerComponent} name={name} {...rest} />;
});

TimePickerComponent.displayName = "TimePickerComponent";
TimePickerAdapter.displayName = "TimePickerAdapter";
