import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

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
