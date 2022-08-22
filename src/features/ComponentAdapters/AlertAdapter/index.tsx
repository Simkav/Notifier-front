import Alert, { AlertProps } from "@mui/material/Alert";
import React, { Dispatch, FC } from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import { AlertTitle } from "@mui/material";
import { Maybe } from "yup/es/types";

type Options = {
  setOpenAlert: Dispatch<boolean>;
  message: Maybe<string>;
  footerMessage: Maybe<string>;
};

type ComponentProps = SnackbarProps & AlertProps & Options;

const AlertAdapter: FC<ComponentProps> = ({
  autoHideDuration = 6000,
  message,
  footerMessage,
  open,
  setOpenAlert,
}) => {
  const handleClose = () => setOpenAlert(!open);

  // TODO разобраться с алертами (красный/зеленый в зависимости от ошибки)

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      open={open}
    >
      <Alert severity={"error"}>
        <AlertTitle className={"css.message"}>{message}</AlertTitle>
        <p className={"css.footerMessage"} style={{ minWidth: "200px" }}>
          {footerMessage}
        </p>
      </Alert>
    </Snackbar>
  );
};

export default AlertAdapter;
