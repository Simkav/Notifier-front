import React, { FC, useEffect } from "react";
import css from "./index.module.scss";
import { ErrorType } from "../../service/types";
import { Maybe } from "yup/es/types";
import { useAppSelector } from "../../service/store";
import { useNavigate } from "react-router-dom";

const UserConnections: FC = () => {
  const isCurrentUser: Maybe<string> = useAppSelector(
    (state) => state.currentUserReducer.jwt
  );

  // const navigate = useNavigate();
  //
  // useEffect(() => {
  //   if (!isCurrentUser) {
  //     navigate("/user/auth", { replace: true });
  //   }
  // }, [isCurrentUser]);

  return (
    <div className={css.container}>
      <p className={css.headText}>
        On this page you can connect your social medias with AlertBot
      </p>
    </div>
  );
};

export default UserConnections;
