import { Button, Input } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@nextui-org/modal";
import { useState, useContext } from "react";
import useValidator from "../../../../../hooks/useValidator";
import { MainContext } from "../../../../../Context/Main";

type Props = { onClose: () => void; isOpen: boolean };

const NewGroup: React.FC<Props> = (props) => {
  //Context
  const mainContext = useContext(MainContext);
  if (!mainContext) throw new Error("No group context");
  // State
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const valide = useValidator([{ value: name, min: 3, max: 20, regex: /^[a-z0-9\s]+$/gi }]);
  const handleAddGroup = async () => {
    setIsLoading(true);
    await mainContext.createGroupFunction(name);
    setName("");
    setIsLoading(false);
    props.onClose();
  };
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Nieuwe groep aanmaken</ModalHeader>
            <ModalBody>
              <Input data-cy="newGroupModalInput" type="text" label="Naam" onChange={(e) => setName(e.target.value)} value={name} />
            </ModalBody>
            <ModalFooter>
              <Button data-cy="newGroupModalClose" color="danger" variant="light" onPress={onClose}>
                Sluiten
              </Button>
              <Button data-cy="newGroupModalSubmit" color="primary" onPress={handleAddGroup} isDisabled={isLoading || !valide}>
                Groep aanmaken
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewGroup;
