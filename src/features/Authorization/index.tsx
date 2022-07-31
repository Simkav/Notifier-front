import React, { FC, SyntheticEvent, useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
import css from "./index.module.scss";
import { AuthorizationForm } from "./Form";
import { userActions } from "./types";

const Authorization: FC = () => {
  const [value, setValue] = useState(userActions.authorization);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        centered
        className={css.tabs}
        onChange={handleChange}
        textColor="primary"
        value={value}
      >
        <Tab
          label={userActions.authorization}
          value={userActions.authorization}
        />
        <Tab
          label={userActions.registration}
          value={userActions.registration}
        />
      </Tabs>
      <AuthorizationForm whichForm={value} />
    </>
  );
};

export default Authorization;
