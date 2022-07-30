import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import css from "./index.module.scss";
import { Button } from "@mui/material";
import { buttonStyle, formNames, showRepeat, textStyle } from "./constants";

type Props = {
  whichForm: string;
};

export const AuthorizationForm: FC<Props> = ({ whichForm }) => {
  return (
    <div className={css.container}>
      <TextField id="login" label="Login" sx={textStyle} variant="filled" />
      <TextField
        id="password"
        label="Password"
        sx={textStyle}
        type="password"
        variant="filled"
      />
      {showRepeat[whichForm] && (
        <TextField
          id="repeat"
          label="Repeat Password"
          sx={textStyle}
          type="password"
          variant="filled"
        />
      )}
      <Button disableElevation sx={buttonStyle} variant="outlined">
        {formNames[whichForm]}
      </Button>
    </div>
  );
};
