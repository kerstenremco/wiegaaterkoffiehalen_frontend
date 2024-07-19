import { useState, useContext, useEffect } from "react";
import { faUser, faBell, faMugHot, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { Button, Tabs, Tab } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@nextui-org/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
// Context
import { MainContext } from "../../../../../Context/Main";
// components
import Group from "./Group/Group";
import Drinks from "./Drinks/Drinks";
import Members from "./Members/Members";
import RemoveGroup from "./RemoveGroup/RemoveGroup";

type Props = { onClose: () => void; isOpen: boolean };

const GroupSettings: React.FC<Props> = (props) => {
  // Context
  const mainContext = useContext(MainContext);
  const navigate = useNavigate();

  // States
  const [blade, setBlade] = useState("group");
  const [valide, setValide] = useState(false);
  const [confirmDispatched, setConfirmDispatched] = useState(false);

  // Effects
  // Effects: set valide to false when blade changes
  useEffect(() => {
    setValide(false);
  }, [blade]);

  // Functions
  // Functions: handle confirm
  const handleConfirm = async () => {
    setConfirmDispatched(true);
  };

  const resetConfirmDispatched = () => {
    setConfirmDispatched(false);
    setValide(false);
  };

  const handleDeleteGroup = async () => {
    if (mainContext && mainContext.currentGroup) {
      await mainContext.deleteGroupFunction();
      // Navigate back to default
      navigate("/dashboard/groups/default");
      props.onClose();
    }
  };

  // If no profile context is found, don't render the component
  if (!mainContext || !mainContext.currentGroup) return null;
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Groepsinstellingen</ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-col">
                <Tabs aria-label="Options" color="primary" radius="lg" selectedKey={blade} onSelectionChange={setBlade} fullWidth>
                  <Tab
                    key="group"
                    className="group"
                    data-cy="groupSettingsTabGeneral"
                    title={
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faUser} className="text-primary group-aria-selected:text-white" />
                        <span>Groep</span>
                      </div>
                    }>
                    <Group updateValide={setValide} confirmDispatched={confirmDispatched} resetConfirmDispatched={resetConfirmDispatched} />
                  </Tab>
                  <Tab
                    key="drinks"
                    className="group"
                    data-cy="groupSettingsTabDrinks"
                    title={
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faMugHot} className="text-primary group-aria-selected:text-white" />
                        <span>Drankjes</span>
                      </div>
                    }>
                    <Drinks updateValide={setValide} onClose={props.onClose} drinks={mainContext.currentGroup!.drinks} />
                  </Tab>
                  <Tab
                    key="members"
                    className="group"
                    data-cy="groupSettingsTabMembers"
                    title={
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faPeopleGroup} className="text-primary group-aria-selected:text-white" />
                        <span>Leden</span>
                      </div>
                    }>
                    <Members
                      members={mainContext.currentGroup!.members}
                      invites={mainContext.currentGroup!.invites}
                      currentUserId={mainContext.profile?.id || ""}
                    />
                  </Tab>
                  <Tab
                    key="remove"
                    data-cy="groupSettingsTabRemove"
                    className="group"
                    title={
                      <div className="flex items-center space-x-2 ">
                        <FontAwesomeIcon icon={faBell} className="text-primary group-aria-selected:text-white" />
                        <span>Verwijderen</span>
                      </div>
                    }>
                    <RemoveGroup groupName="Test" handleRemove={handleDeleteGroup} isRemoved={false} />
                  </Tab>
                </Tabs>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button data-cy="groupSettingsClose" color="danger" variant="light" onPress={onClose}>
                Sluiten
              </Button>
              <Button data-cy="groupSettingsSave" color="primary" onPress={handleConfirm} isDisabled={!valide}>
                Opslaan
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default GroupSettings;
