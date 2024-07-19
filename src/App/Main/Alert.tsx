import React from "react";
import { Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@nextui-org/modal";

type Props = {
  message?: string;
  onClose: () => void;
};
const Alert: React.FC<Props> = (props) => {
  return (
    <Modal isOpen={props.message != undefined} onClose={props.onClose} hideCloseButton isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Oeps...</ModalHeader>
            <ModalBody>
              <p>{props.message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Begrepen
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Alert;
