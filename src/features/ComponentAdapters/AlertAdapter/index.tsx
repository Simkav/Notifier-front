import Alert, { AlertProps } from "@mui/material/Alert";
import React, { Dispatch, FC } from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import { AlertTitle } from "@mui/material";
import { Maybe } from "yup/es/types";

type Options = {
  setOpenAlert: Dispatch<boolean>;
  message: Maybe<string>;
  footerMessage?: Maybe<string>;
};

type ComponentProps = SnackbarProps & AlertProps & Options;

const AlertAdapter: FC<ComponentProps> = ({
  autoHideDuration = 6000,
  message,
  footerMessage,
  open,
  setOpenAlert,
  severity = "error",
}) => {
  const handleClose = () => setOpenAlert(!open);

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      open={open}
    >
      <Alert severity={severity}>
        <AlertTitle >{message}</AlertTitle>
        <p style={{ minWidth: "150px" }}>
          {footerMessage ?? undefined}
        </p>
      </Alert>
    </Snackbar>
  );
};

export default AlertAdapter;
