import React, { FC } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import css from "./index.module.scss";
import { modalTabs } from "./constants";

type Props = {
  modalType: modalTabs;
  setModalType: React.Dispatch<React.SetStateAction<modalTabs>>;
};

const ModalTabs: FC<Props> = ({ modalType, setModalType }) => {
  return (
    <Tabs centered className={css.tabs} textColor="primary" value={modalType}>
      <Tab
        label={modalTabs.create}
        onClick={() => setModalType(modalTabs.create)}
        value={modalTabs.create}
      />
      <Tab
        label={modalTabs.all}
        onClick={() => setModalType(modalTabs.all)}
        value={modalTabs.all}
      />
    </Tabs>
  );
};

export default ModalTabs;
