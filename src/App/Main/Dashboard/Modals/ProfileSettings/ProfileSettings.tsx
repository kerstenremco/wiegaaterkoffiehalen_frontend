import { faBell, faUser, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { Switch, Tab, Tabs, Tooltip, Button, Input } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@nextui-org/modal";
import { Fragment, useContext, useEffect, useState } from "react";
// Context
import { MainContext } from "../../../../../Context/Main";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Emojis from "../../../../../Components/Emojis";

type Props = { onClose: () => void; isOpen: boolean; onEditPhoneNumber: () => void };

const ProfileSettings: React.FC<Props> = (props) => {
  // Context
  const mainContext = useContext(MainContext);
  if (!mainContext || !mainContext.profile) throw new Error("No profile context");

  // States
  const [blade, setBlade] = useState("profile");
  const [valide, setValide] = useState(false);
  // States: profile
  const [newName, setName] = useState(mainContext.profile.name);
  const [newAvatar, setAvatar] = useState(mainContext.profile.avatar);

  // Effects
  // Effects: set valide to false when blade changes
  useEffect(() => {
    setValide(false);
  }, [blade]);
  // Effects: check if the form is valid
  useEffect(() => {
    const r = /^[a-z\s]+$/gi;
    const v =
      blade == "profile" &&
      newName.length > 2 &&
      r.test(newName) &&
      newName.length < 20 &&
      newAvatar.length > 0 &&
      (newName != mainContext.profile?.name || newAvatar != mainContext.profile.avatar);
    setValide(v);
  }, [newName, newAvatar, blade]);

  // Functions
  // Functions: handle confirm
  const handleConfirm = async () => {
    if (blade == "profile") {
      await mainContext.updateProfileFunction({ name: newName, avatar: newAvatar });
      setValide(false);
    }
  };

  // Component
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Profielinstellingen</ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-col">
                <Tabs aria-label="Options" color="primary" radius="lg" selectedKey={blade} onSelectionChange={setBlade} fullWidth>
                  <Tab
                    key="profile"
                    className="group"
                    title={
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faUser} className="group-aria-selected:text-white" />
                        <span>Profiel</span>
                      </div>
                    }>
                    <div className="grid gap-6">
                      <Input type="text" label="Naam" onChange={(e) => setName(e.target.value)} value={newName} />
                      <div className="flex gap-4 items-center">
                        <Input
                          type="text"
                          label="Telefoonnummer"
                          onChange={(e) => setName(e.target.value)}
                          value={mainContext.profile?.phoneNumberVerified ? mainContext.profile?.phoneNumber : ""}
                          disabled={true}
                        />
                        <Tooltip color="primary" showArrow={true} content="Telefoonnummer toevoegen">
                          <FontAwesomeIcon icon={faSquarePlus} size="2x" className="text-primary" onClick={props.onEditPhoneNumber} />
                        </Tooltip>
                      </div>
                      <Emojis current={newAvatar} onClick={(filename) => setAvatar(filename)} />
                    </div>
                  </Tab>
                  <Tab
                    key="notifications"
                    className="group"
                    title={
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faBell} className="group-aria-selected:text-white" />
                        <span>Notificaties</span>
                      </div>
                    }>
                    <>
                      <div className="grid grid-cols-3 gap-6">
                        <span>Groep</span>
                        <span>Email</span>
                        <span>WhatsApp</span>
                        {mainContext.myGroups.map((group) => {
                          return (
                            <Fragment key={group.id}>
                              <span>{group.name}</span>
                              <Switch
                                defaultSelected
                                isSelected={group.emailNotification}
                                onValueChange={(value) => mainContext.toggleNotificationFunction(group.id, "email", value)}
                                aria-label="emailNotification"
                              />
                              <Switch
                                defaultSelected
                                isSelected={group.whatsappNotification}
                                onValueChange={(value) => mainContext.toggleNotificationFunction(group.id, "whatsapp", value)}
                                aria-label="whatsappNotification"
                              />
                            </Fragment>
                          );
                        })}
                      </div>
                    </>
                  </Tab>
                </Tabs>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Sluiten
              </Button>
              <Button color="primary" onPress={handleConfirm} isDisabled={!valide}>
                Opslaan
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProfileSettings;
