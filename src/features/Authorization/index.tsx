import React, { FC, SyntheticEvent, useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import css from "./index.module.scss";
import { AuthorizationForm } from "./Form";
import { authEnum } from "./types";

const Authorization: FC = () => {
  const [value, setValue] = useState<authEnum>(authEnum.authorization);

  const handleChange = (event: SyntheticEvent, newValue: authEnum) => {
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
        <Tab label={authEnum.authorization} value={authEnum.authorization} />
        <Tab label={authEnum.registration} value={authEnum.registration} />
      </Tabs>
      <AuthorizationForm whichForm={value} />
    </>
  );
};

export default Authorization;
