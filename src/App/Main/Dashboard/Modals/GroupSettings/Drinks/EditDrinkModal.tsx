import { useState, useEffect } from "react";
import { Input, Avatar, Modal, ModalBody, ModalHeader, ModalContent, ModalFooter, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Icons
import { faMugHot, faTrashCan, faSquareCheck, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import coffeeIcons from "../../../../../../assets/coffee-icons";
import useValidator from "../../../../../../hooks/useValidator";
// Utils
import { Drink } from "../../../../../../api-sdk";

type Props = {
  close: () => void;
  addDrink: (name: string, icon: string, extras: string) => void;
  editingDrink?: Drink;
};

const EditDrinkModal: React.FC<Props> = (props) => {
  // States
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<string | undefined>(undefined);
  const [extras, setExtras] = useState(new Set<string>());
  const [extra, setExtra] = useState("");
  // Validator
  const formIsValid = useValidator([{ value: name, min: 3, max: 30, regex: /^[a-z0-9\s]+$/gi }]);
  const extraIsValid = useValidator([{ value: extra, min: 3, max: 30, regex: /^[a-z0-9\s]+$/gi }]);

  // Effects
  useEffect(() => {
    if (props.editingDrink) {
      setName(props.editingDrink.name);
      setIcon(props.editingDrink.icon);
      const sep = props.editingDrink.extras ? props.editingDrink.extras.split(",") : [];
      setExtras(new Set(sep));
    }
  }, []);

  const classNameForCheckIcon = extraIsValid ? "cursor-pointer" : "grayscale-[80%] cursor-not-allowed";
  // Functions
  const handleAddDrink = () => {
    if (formIsValid) {
      const e = extras.size > 0 ? Array.from(extras).join(",") : "";
      // Icon is there because form is set as valid
      props.addDrink(name, icon!, e);
      props.close();
    }
  };
  const handleAddExtra = () => {
    if (!extraIsValid) return;
    setExtras((oldState) => {
      const newState = new Set(oldState);
      newState.add(extra);
      return newState;
    });
    setExtra("");
  };

  const handleRemoveExtra = (extra: string) => {
    if (extra) {
      setExtras((oldState) => {
        const newState = new Set(oldState);
        newState.delete(extra);
        return newState;
      });
    }
  };
  return (
    <Modal isOpen={true} onClose={props.close}>
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{props.editingDrink ? "Drankje bewerken" : "Nieuwe drakje toevoegen"}</ModalHeader>
            <ModalBody>
              <Input data-cy="editDrinkModalName" type="text" label="Naam drankje" onChange={(e) => setName(e.target.value)} value={name} />
              <div data-cy="editDrinkModalIcons" className="flex flex-row flex-wrap gap-2 mt-5">
                {Object.entries(coffeeIcons).map(([iconName, path]) => (
                  <Avatar key={iconName} src={path} isBordered={iconName == icon} className="ring-primary-700" onClick={() => setIcon(iconName)} />
                ))}
              </div>
              <hr />
              Extra's
              <div className="flex flex-row items-center gap-4">
                <Input data-cy="editDrinkModalExtra" type="text" label="Nieuw extra" onChange={(e) => setExtra(e.target.value)} value={extra} />
                <FontAwesomeIcon
                  data-cy="editDrinkModalConfirmExtra"
                  className={classNameForCheckIcon}
                  icon={faSquareCheck}
                  size="2x"
                  onClick={handleAddExtra}
                />
              </div>
              {Array.from(extras).map((extra) => (
                <div className="flex items-center gap-1" key={extra}>
                  <FontAwesomeIcon icon={faCircleDot} size="lg" />
                  <span className="flex-1">{extra}</span>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    size="lg"
                    className="text-danger-LIGHT hover:text-danger"
                    onClick={() => handleRemoveExtra(extra)}
                  />
                </div>
              ))}
            </ModalBody>
            <hr />
            <ModalFooter>
              <Button data-cy="editDrinkModalCancel" color="danger" variant="light" onPress={close}>
                Annuleren
              </Button>
              <Button
                data-cy="editDrinkModalConfirm"
                color="primary"
                isDisabled={!(formIsValid == true && icon != undefined)}
                onClick={handleAddDrink}>
                Opslaan
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default EditDrinkModal;
