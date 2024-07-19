import { Button } from "@nextui-org/react";
import { Modal as NModal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@nextui-org/modal";

type Props = { title: string; content: any; confirmText: string; cancelText: string; confirm: () => void; cancel: () => void };

const Modal: React.FC<Props> = (props) => {
  return (
    <NModal isOpen={true} onClose={props.cancel}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{props.title}</ModalHeader>
        <ModalBody>{props.content}</ModalBody>
        <ModalFooter>
          <Button color="danger" className="modal-no" variant="light" onPress={props.cancel}>
            {props.cancelText}
          </Button>
          <Button color="primary" className="modal-yes" onPress={props.confirm}>
            {props.confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </NModal>
  );
};

export default Modal;
