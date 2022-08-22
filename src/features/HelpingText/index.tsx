import React, { FC } from "react";
import css from "./index.module.scss";

const HelpingText: FC<{ text: string }> = ({ text }) => {
  return (
    <div className={css.container}>
      <p className={css.headText}>{text}</p>
    </div>
  );
};

export default HelpingText;
