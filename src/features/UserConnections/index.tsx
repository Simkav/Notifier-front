import ConnectionDescription from "./ConnectionDescription";
import HelpingText from "../HelpingText";
import React, { FC, useCallback, useEffect } from "react";
import css from "./index.module.scss";
import { Maybe } from "yup/es/types";
import {
  connectionsEnum,
  connectionsVariation,
} from "./ConnectionDescription/constants";
import { helpingText } from "./constants";
import { useAppSelector } from "../../service/store";
import { useNavigate } from "react-router";

const UserConnections: FC = () => {
  const isCurrentUser: Maybe<string> = useAppSelector(
    (state) => state.currentUserReducer.jwt
  );

  const [activePanel, setActivePanel] =
    React.useState<connectionsVariation | null>(null);

  const navigate = useNavigate();

  const handleClick = useCallback(
    (panel: connectionsVariation) => {
      console.log(panel, activePanel);
      if (activePanel === panel) {
        setActivePanel(null);
      } else {
        setActivePanel(panel);
      }
    },
    [setActivePanel, activePanel]
  );

  useEffect(() => {
    if (!isCurrentUser) {
      navigate("/user/auth", { replace: true });
    }
  }, [isCurrentUser, navigate]);

  return (
    <>
      <HelpingText text={helpingText} />
      <div className={css.container}>
        {connectionsEnum.map((connection) => (
          <ConnectionDescription
            key={connection}
            activePanel={activePanel}
            code={connection}
            descriptionFor={connectionsVariation[connection]}
            handleClick={handleClick}
            mail={"simkav@gamil.com"}
          />
        ))}
      </div>
    </>
  );
};

export default UserConnections;
