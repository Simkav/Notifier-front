import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import style from "./index.module.scss";

const Header = () => {
  return (
    <div className={style.container}>
      <a
        className={style.icon}
        href="https://github.com/Simkav/Notifier-front"
        rel="noreferrer"
        target="_blank"
      >
        <GitHubIcon fontSize="large" sx={{ color: "#66b2ff" }} />
      </a>
      <div className={style.name}>Notifier</div>
      <div className={style.icon}>
        <AccountBoxIcon fontSize="large" sx={{ color: "#66b2ff" }} />
      </div>
    </div>
  );
};

export default Header;
