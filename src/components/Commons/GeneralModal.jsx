import { Button, Modal } from "flowbite-react";
import { useEffect } from "react";

import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const GeneralModal = ({ title, children, show, typeModal, buttonMessage, onClose }) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(show);
  }, [show]);

  const handleClose = () => {
    onClose(false);
  }

  return (
    <Modal show={openModal} onClose={handleClose}>
      <Modal.Header>
        {title}
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-center">
          <Button
            color={typeModal === 'error' ? 'failure' : 'blue'}
            onClick={handleClose}
          >
            {buttonMessage}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}