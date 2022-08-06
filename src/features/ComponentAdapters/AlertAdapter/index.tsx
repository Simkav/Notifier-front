import Alert, { AlertProps } from "@mui/material/Alert";
import React, { Dispatch, FC, useState } from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import { ErrorType } from "../../../service/types";
import { successAlert } from "./constants";

type Options = {
  error: ErrorType;
  message?: string;
  setOpenModal: Dispatch<boolean>;
};

type ComponentProps = SnackbarProps & AlertProps & Options;

const AlertAdapter: FC<ComponentProps> = ({
  color = "error",
  autoHideDuration = 6000,
  error,
  open,
  setOpenModal,
}) => {
  const { message, code } = error;

  const [isError, _] = useState(!!(message || code));

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
      <Alert
        color={color}
        severity={isError ? "error" : "success"}
        variant={"outlined"}
      >
        <p className={"css.message"}>{isError ? error.message : message}</p>
        <p className={"css.codeMessage"}>
          {isError ? code : successAlert.code}
        </p>
      </Alert>
    </Snackbar>
  );
};

export default AlertAdapter;
