import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Fade from "@mui/material/Fade";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useCallback } from "react";
import SpokeIcon from "@mui/icons-material/Spoke";
import Tooltip from "@mui/material/Tooltip";
import css from "./index.module.scss";
import style from "./index.module.scss";
import { Popover } from "@mui/material";
import { dropCurrentUser } from "../../service/slices/currentUser/currentUser.slice";
import { getEmailName } from "../Authorization/utils";
import { useAppDispatch, useAppSelector } from "../../service/store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);

  const handleIconClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (path: string) => {
      navigate(`/${path}`, { replace: true });
    },
    [navigate]
  );
  // TODO - make custom tooltip, separate components

  const currentUserMail = useAppSelector(
    (state) => state.currentUserReducer?.userEmail
  );

  const handleConnectionsClick = () => {
    navigate(`/user/${getEmailName(currentUserMail)}`);
    setAnchorEl(null);
  };

  const handleGoToAuthClick = () => {
    navigate("/user/auth");
    setAnchorEl(null);
  };

  const handleGoToCalendarClick = () => {
    navigate("/main");
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    dispatch(dropCurrentUser());
    handleGoToAuthClick();
    setAnchorEl(null);
  };

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
        <div className={style.name} onClick={() => handleClick("main")}>
          Notifier
        </div>
      </Tooltip>
      <>
        <AccountBoxIcon
          aria-describedby={"accountIcon"}
          className={style.icon}
          fontSize="large"
          onClick={currentUserMail ? handleIconClick : handleGoToAuthClick}
          sx={{ color: "#66b2ff" }}
        />
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: "left",
            vertical: "bottom",
          }}
          id={"accountIcon"}
          onClose={handleClose}
          open={open}
          transformOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
        >
          <div className={css.popoverContainer}>
            <div className={css.popoverItem} onClick={handleGoToCalendarClick}>
              <CalendarTodayIcon />
              <span className={css.iconText}>Calendar</span>
            </div>
            <div className={css.popoverItem} onClick={handleConnectionsClick}>
              <SpokeIcon />
              <span className={css.iconText}>Connections</span>
            </div>
            <div className={css.popoverItem} onClick={handleLogoutClick}>
              <LogoutIcon />
              <span className={css.iconText}>Log Out</span>
            </div>
          </div>
        </Popover>
      </>
    </div>
  );
};

export default Header;
