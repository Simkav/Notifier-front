import React, { FC, PropsWithChildren } from "react";
import css from "./index.module.scss";

const Label: FC<PropsWithChildren> = ({ children }) => {
  return <p className={css.label}> {children} </p>;
};

export default Label;
