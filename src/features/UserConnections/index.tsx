import React, { FC, useEffect } from "react";
import css from "./index.module.scss";
import { Maybe } from "yup/es/types";
import { useAppSelector } from "../../service/store";
import { useNavigate } from "react-router";

const UserConnections: FC = () => {
  const isCurrentUser: Maybe<string> = useAppSelector(
    (state) => state.currentUserReducer.jwt
  );
  console.log(4);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(5);

    if (!isCurrentUser) {
      console.log(6);

      navigate("/user/auth", { replace: true });
    }
  });

  return (
    <div className={css.container}>
      <p className={css.headText}>
        On this page you can connect your social medias with AlertBot
      </p>
    </div>
  );
};

export default UserConnections;
