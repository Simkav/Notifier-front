import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import ModalForm from "./ModalForm";
import ModalTabs from "./ModalTabs";
import React, { useState } from "react";
import css from "./index.module.scss";
import { QueryObserverResult } from "@tanstack/react-query";
import {daysOnScreenType} from "../Main/UICalendar/types";
import { format, parse } from "date-fns";
import { modalTabs } from "./ModalTabs/constants";

type ComponentProps = {
  isOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  day?: daysOnScreenType;
  refetch: () => Promise<QueryObserverResult<any>>;
};

export const UIModal = React.memo<ComponentProps>(
  ({ isOpen, setOpenModal, day, refetch }) => {
    const [modalType, setModalType] = useState<modalTabs>(modalTabs.create);

    if (!day) {
      setOpenModal(false);

      return <></>;
    }

    const dayName = format(
      parse(day.id, "dd/MM/yyyy", new Date()),
      "LLLL do yyyy"
    );

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
              <span>{dayName}</span>
              <span>Choose your notification parameters</span>
            </h3>
            <ModalTabs modalType={modalType} setModalType={setModalType} />
            {modalType === modalTabs.create ? (
              <ModalForm
                chosenDay
={day}
                refetch={refetch}
                setOpenModal={setOpenModal}
              />
            ) : (
              <>All</>
            )}
          </div>
        </>
      </Modal>
    );
  }
);

UIModal.displayName = "UIModal";
