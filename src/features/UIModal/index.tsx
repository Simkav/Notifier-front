import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import ModalForm from "./ModalForm";
import ModalNotificationList from "./ModalNotificationList";
import ModalTabs from "./ModalTabs";
import React, { FC, useState } from "react";
import css from "./index.module.scss";
import { QueryObserverResult } from "@tanstack/react-query";
import { createDayName } from "./utils";
import { daysOnScreenType } from "../Main/UICalendar/types";
import { format, parse } from "date-fns";
import { modalTabs } from "./ModalTabs/constants";

type ComponentProps = {
  isOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  day?: daysOnScreenType;
  refetch: () => Promise<QueryObserverResult<any>>;
};

const UIModal: FC<ComponentProps> = ({
  isOpen,
  setOpenModal,
  day,
  refetch,
}) => {
  const [modalType, setModalType] = useState<modalTabs>(modalTabs.create);

  if (!day) {
    setOpenModal(false);

    return null;
  }

  return (
    <Modal
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 700,
      }}
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      disableAutoFocus={true}
      onClose={() => setOpenModal(false)}
      open={isOpen}
    >
      <>
        <div className={css.container}>
          <h3 className={css.modalHeader}>
            <span>{createDayName(day.id, "dd/MM/yyyy")}</span>
            <span>Choose your notification parameters</span>
          </h3>
          <ModalTabs modalType={modalType} setModalType={setModalType} />
          {modalType === modalTabs.create ? (
            <ModalForm
              chosenDay={day}
              refetch={refetch}
              setOpenModal={setOpenModal}
            />
          ) : (
            <ModalNotificationList chosenDay={day} />
          )}
        </div>
      </>
    </Modal>
  );
};

export default UIModal;
