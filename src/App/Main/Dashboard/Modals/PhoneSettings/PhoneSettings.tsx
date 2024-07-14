import { Modal, ModalContent, ModalHeader, ModalBody, Button, Input, Divider, Progress } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../../../Context/Main";

type Props = { onClose: () => void; isOpen: boolean };

const ProfileSettings: React.FC<Props> = (props) => {
  const mainContext = useContext(MainContext);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [code, setCode] = useState("");
  const [codeValid, setCodeValid] = useState(false);

  useEffect(() => {
    const regex = /^06\d{8}$/;
    setPhoneValid(regex.test(phone));
  }, [phone]);

  useEffect(() => {
    const regex = /\d{6}/;
    setCodeValid(regex.test(code));
  }, [code]);

  const handlePhone = async () => {
    const phoneNumber = `+31${phone}`.replace("+310", "+31");
    await mainContext?.updateProfileFunction({ phoneNumber });
    setStage(1);
    setProgress(50);
  };

  const handleCode = async () => {
    try {
      await mainContext?.updateProfileFunction({ phoneNumberVerificationCode: code });
      setStage(2);
      setProgress(100);
    } catch (e) {
      setCodeValid(false);
    }
  };

  const handleClose = () => {
    setStage(0);
    setProgress(0);
    setPhone("");
    setPhoneValid(false);
    setCode("");
    setCodeValid(false);
    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Telefoonnummer toevoegen</ModalHeader>
            <ModalBody>
              <Progress aria-label="Voortgang" value={progress} className="max-w-md" />
              <p>Wil je een WhatsApp bericht ontvangen wanneer er een koffieronde begint? Voeg dan hieronder je telefoonnummer in.</p>
              <p>Je kan dit ook op een later moment doen onder je profielinstellingen.</p>
              <Input
                type="tel"
                color={phoneValid ? "success" : "primary"}
                label="Telefoonnummer"
                placeholder="0612345678"
                onValueChange={setPhone}
                disabled={stage > 0}
              />
              <Button color="primary" onPress={handlePhone} isDisabled={!phoneValid || stage > 0}>
                Volgende
              </Button>
              {stage > 0 && (
                <>
                  <Divider />
                  <p>Voer de verificatiecode in die je via WhatsApp hebt ontvangen:</p>
                  <Input
                    type="text"
                    color={codeValid ? "success" : "primary"}
                    label="Verificatiecode"
                    placeholder="123456"
                    onValueChange={setCode}
                    disabled={stage > 1}
                  />
                  <Button color="primary" onPress={handleCode} isDisabled={!codeValid || stage > 1}>
                    Valideren
                  </Button>
                </>
              )}
              {stage > 1 && (
                <>
                  <Divider />
                  <p>Je telefoonnummer is gevalideerd!</p>
                  <Button color="primary" onPress={onClose}>
                    Oke
                  </Button>
                </>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProfileSettings;
