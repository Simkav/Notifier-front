import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import ModalForm from "./ModalForm";
import React from "react";
import css from "./index.module.scss";
import { RadioAdapter } from "../ComponentAdapters/RadioAdapter";
import { format, parse } from "date-fns";

type ComponentProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  day?: any;
};

export const UIModal = React.memo<ComponentProps>(
  ({ isOpen, setOpen, day }) => {
    if (!day) {
      setOpen(false);

      return <></>;
    }

    const dayName = format(
      parse(day.id, "dd/MM/yyyy", new Date()),
      "LLLL do , yyyy"
    );
    console.log(dayName);

    return (
      <>
        <Modal
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 700,
          }}
          aria-describedby="modal-modal-description"
          aria-labelledby="modal-modal-title"
          disableAutoFocus={true}
          onClose={() => setOpen(false)}
          open={isOpen}
        >
          <div className={css.container}>
            <h3 className={css.modalHeader}>{dayName}</h3>
            <div className={css.modalForm}>
              <ModalForm />
            </div>
          </div>
        </Modal>
      </>
    );
  }
);

UIModal.displayName = "UIModal";
