import { Button, Modal } from "flowbite-react";
import { useEffect } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const ErrorModal = ({ message, show, onClose }) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(show);
  }, [show]);

  const handleClose = () => {
    onClose(false);
  }

  return (
    <Modal show={openModal} onClose={() => handleClose()} size="md" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 size-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleClose}>
              {"Cerrar"}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}