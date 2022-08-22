import HelpingText from "../HelpingText";
import React, { FC, useEffect } from "react";
import { Maybe } from "yup/es/types";
import { helpingText } from "./constants";
import { useAppSelector } from "../../service/store";
import { useNavigate } from "react-router";

const UserConnections: FC = () => {
  const isCurrentUser: Maybe<string> = useAppSelector(
    (state) => state.currentUserReducer.jwt
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isCurrentUser) {
      navigate("/user/auth", { replace: true });
    }
  }, [isCurrentUser, navigate]);

  return <HelpingText text={helpingText} />;
};

export default UserConnections;
