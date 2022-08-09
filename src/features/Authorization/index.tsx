import React, { FC, SyntheticEvent, useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import css from "./index.module.scss";
import { AuthorizationForm } from "./Form";
import { formEnum } from "./types";

const Authorization: FC = () => {
  const [value, setValue] = useState<formEnum>(formEnum.authorization);

  const handleChange = (event: SyntheticEvent, newValue: formEnum) => {
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
        <Tab label={formEnum.authorization} value={formEnum.authorization} />
        <Tab label={formEnum.registration} value={formEnum.registration} />
      </Tabs>
      <AuthorizationForm formType={value} />
    </>
  );
};

export default Authorization;
