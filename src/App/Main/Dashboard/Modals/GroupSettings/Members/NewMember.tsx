import { Button, Input, Checkbox } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@nextui-org/modal";
import { useState } from "react";
type Props = {
  onClose: () => void;
  onConfirm: (email: string, invite: boolean) => void;
  mustInvite: boolean;
};
const NewMemberModal: React.FC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [invite, setInvite] = useState(false);
  const handleAddNewUser = () => props.onConfirm(email, invite);
  return (
    <Modal isOpen={true} onClose={props.onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Nieuw lid toevoegen</ModalHeader>
            <ModalBody>
              <>
                <Input
                  data-cy="membersAddInput"
                  className="mb-2"
                  type="text"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {props.mustInvite && (
                  <Checkbox isSelected={invite} onValueChange={setInvite}>
                    Deze gebruiker is nog geen lid van wiegaaterkofiehalen.nl. Wil je deze gebruiker uitnodigen?
                  </Checkbox>
                )}
              </>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Annuleren
              </Button>
              <Button data-cy="membersAddConfirm" color="primary" onPress={handleAddNewUser}>
                Toevoegen
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewMemberModal;
