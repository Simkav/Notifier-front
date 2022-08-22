import Radio from "@mui/material/Radio";
import React from "react";
import { BaseAdapterProps } from "../type";
import { Field, FieldProps } from "formik";
import { RadioGroup } from "@mui/material";
import  { TextFieldProps } from "@mui/material/TextField";

type Options = {
  message?: string;
  values: string;
  handleChange: any;
};

type Props = Options & BaseAdapterProps & TextFieldProps;

type ComponentProps = Props & FieldProps;

const RadioComponent = React.memo<ComponentProps>((props) => {
  const { value, ...rest } = props;

  return <Radio value={"1"} />;
});

export const RadioAdapter = React.memo<Props>((props) => {
  const { name, handleChange, values, ...rest } = props;

  return (
    <Field
      component={RadioGroup}
      handleChange={handleChange}
      name="type"
      type="radio"
      value={values}
      {...rest}
      onChange={() => console.log(values)}
    >
      <Radio value={"1"} />
      <Radio value={"2"} />
      <Radio value={"3"} />
    </Field>
  );
});

RadioComponent.displayName = "RadioComponent";
RadioAdapter.displayName = "RadioAdapter";
