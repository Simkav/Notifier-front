import Alert, { AlertProps } from "@mui/material/Alert";
import React, { Dispatch, FC } from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import { AlertTitle } from "@mui/material";
import { requestType } from "../../../service/slices/currentUser/types";

type Options = {
  request: requestType;
  alertMessage?: string;
  setOpenModal: Dispatch<boolean>;
};

type ComponentProps = SnackbarProps & AlertProps & Options;

const AlertAdapter: FC<ComponentProps> = ({
  autoHideDuration = 6000,
  alertMessage,
  request,
  open,
  setOpenModal,
}) => {
  const { message, codeMessage } = request;

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
      <Alert severity={"error"} >
        <AlertTitle className={"css.message"}>
          {message ?? alertMessage}
        </AlertTitle>
        <p className={"css.codeMessage"}  style={{ minWidth: "200px" }}>
          {codeMessage}
        </p>
      </Alert>
    </Snackbar>
  );
};

export default AlertAdapter;
