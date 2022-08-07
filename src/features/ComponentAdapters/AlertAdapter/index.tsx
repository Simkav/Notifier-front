import Alert, { AlertProps } from "@mui/material/Alert";
import React, { Dispatch, FC, useEffect, useState } from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import { AlertTitle } from "@mui/material";
import { ErrorType } from "../../../service/types";

type Options = {
  error: ErrorType;
  alertMessage?: string;
  setOpenModal: Dispatch<boolean>;
};

type ComponentProps = SnackbarProps & AlertProps & Options;

const AlertAdapter: FC<ComponentProps> = ({
  autoHideDuration = 6000,
  alertMessage,
  error,
  open,
  setOpenModal,
}) => {
  const { message, code } = error;

  const [isError, setError] = useState(false);

  useEffect(() => {
    setError(!!(message || code));
  }, [message, code]);

  const handleClose = () => setOpenModal(!open);

  // TODO разобраться с алертами (красный/зеленый в зависимости от ошибки)
  // подключить сn к стилям
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      open={open}
    >
      <Alert severity={isError ? "error" : "success"}>
        <AlertTitle className={"css.message"}>
          {isError ? error.message : alertMessage}
        </AlertTitle>
        <p className={"css.codeMessage"}>{isError ? code : code}</p>
      </Alert>
    </Snackbar>
  );
};

export default AlertAdapter;
