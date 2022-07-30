import React, { FC, SyntheticEvent, useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import css from "./index.module.scss";
import { AuthorizationForm } from "./Form";
import { User } from "./types";

const Authorization: FC = () => {
  const [value, setValue] = useState(User.authorization);

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
        <Tab label={User.authorization} value={User.authorization} />
        <Tab label={User.registration} value={User.registration} />
      </Tabs>
      <AuthorizationForm whichForm={value} />
    </>
  );
};

export default Authorization;
