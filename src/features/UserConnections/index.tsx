import React, { FC, useEffect } from "react";
import css from "./index.module.scss";
import { Maybe } from "yup/es/types";
import { useAppSelector } from "../../service/store";

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
