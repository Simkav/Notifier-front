import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Fade from "@mui/material/Fade";
import GitHubIcon from "@mui/icons-material/GitHub";
import React, { useCallback } from "react";
import Tooltip from "@mui/material/Tooltip";
import style from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (path: string) => {
      navigate(`/${path}`, { replace: true });
    },
    [navigate]
  );
  // TODO - make custom tooltip, separate components

  return (
    <div className={style.container}>
      <Tooltip TransitionComponent={Fade} title="Go to our Github">
        <a
          className={style.icon}
          href="https://github.com/Simkav/Notifier-front"
          rel="noreferrer"
          target="_blank"
        >
          <GitHubIcon fontSize="large" sx={{ color: "#66b2ff" }} />
        </a>
      </Tooltip>
      <Tooltip TransitionComponent={Fade} title="Go to Main page">
        <div className={style.name} onClick={() => handleClick("")}>
          Notifier
        </div>
      </Tooltip>
      <Tooltip TransitionComponent={Fade} title="Go to Authorization page">
        <AccountBoxIcon
          className={style.icon}
          fontSize="large"
          onClick={() => handleClick("auth")}
          sx={{ color: "#66b2ff" }}
        />
      </Tooltip>
    </div>
  );
};

export default Header;
