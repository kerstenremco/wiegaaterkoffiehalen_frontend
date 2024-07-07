import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
type Props = {
  removeDrink: string | undefined;
  onClose: () => void;
  onConfirm: () => void;
};
const RemoveDrinkModal: React.FC<Props> = (props) => {
  return (
    <Modal isOpen={true} onClose={props.onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{`${props.removeDrink} verwijderen`}</ModalHeader>
            <ModalBody>
              <p>{`Weet je zeker dat je ${props.removeDrink} wilt verwijderen?`}</p>
            </ModalBody>
            <ModalFooter>
              <Button data-cy="removeDrinkModalCancel" color="danger" variant="light" onPress={onClose}>
                Annuleren
              </Button>
              <Button data-cy="removeDrinkModalConfirm" color="primary" onPress={props.onConfirm}>
                Verwijderen
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RemoveDrinkModal;
