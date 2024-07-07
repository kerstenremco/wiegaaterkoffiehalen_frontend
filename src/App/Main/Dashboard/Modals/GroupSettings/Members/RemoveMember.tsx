import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
type Props = {
  name: string;
  onClose: () => void;
  onConfirm: () => void;
};
const RemoveMemberModal: React.FC<Props> = (props) => {
  return (
    <Modal isOpen={true} onClose={props.onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{`${props.name} verwijderen`}</ModalHeader>
            <ModalBody>
              <p>{`Weet je zeker dat je ${props.name} wilt verwijderen?`}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Annuleren
              </Button>
              <Button color="primary" onPress={props.onConfirm}>
                Verwijderen
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RemoveMemberModal;
