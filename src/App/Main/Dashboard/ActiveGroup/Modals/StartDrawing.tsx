import { Input, Checkbox } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import Button from "../../../../../Components/layout/Button";

type Props = { close: () => void; startDrawing: (seconds: number, self: boolean) => void };

const StartDrawing: React.FC<Props> = (props) => {
  // States
  const [time, setTime] = useState("2");
  const [self, setSelf] = useState(false);
  const [validInput, setValidInput] = useState(false);

  // Effects
  useEffect(() => {
    setValidInput(Number(time) > 0 && Number(time) < 11 && Number.isInteger(Number(time)));
  }, [time]);
  // Functions

  const handleStartDrawing = () => {
    const seconds = Number(time) * 60;
    props.startDrawing(seconds, self);
    props.close();
  };

  // Component
  return (
    <Modal size="4xl" isOpen={true} isDismissable={false} onClose={props.close} classNames={{ body: "flex flex-row m-0 p-0" }}>
      <ModalContent>
        <ModalBody className="m-5 flex-col">
          <h1 className="text-center">Alright, koffietijd!</h1>
          <Input
            type="number"
            inputMode="numeric"
            label="Aantal minuten voordat ronde begint"
            labelPlacement="outside"
            value={time}
            onValueChange={setTime}
            min={1}
            max={10}
          />
          <Checkbox isSelected={self} color="primary" onValueChange={setSelf}>
            Ik haal zelf koffie!
          </Checkbox>
          <Button onClick={handleStartDrawing} isDisabled={!validInput}>
            Start ronde
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StartDrawing;
