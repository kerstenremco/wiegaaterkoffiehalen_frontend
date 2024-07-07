import { Modal, ModalContent, ModalBody, Avatar, Tooltip, Input, CheckboxGroup, Checkbox, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import coffeeIcons from "../../../../../assets/coffee-icons";
import useValidator from "../../../../../hooks/useValidator";

type Props = { close: () => void; placeOrder: (chosenDrink: string, text?: string, extras?: string[]) => void; drinks?: IDrink[] };

const PlaceOrder: React.FC<Props> = (props) => {
  const [chosenDrink, setChosenDrink] = useState("");
  const [text, setText] = useState<string | undefined>(undefined);
  const [availableExtras, setAvailableExtras] = useState<string[]>([]);
  const [selectedExtras, setselectedExtras] = useState<string[] | undefined>(undefined);
  const textIsValid = useValidator([{ value: text || "", min: 0, max: 60, regex: /^[a-z0-9,.!%&()-+:/\s]+$/gi }]);
  useEffect(() => {
    if (chosenDrink.length > 0) {
      setselectedExtras(undefined);
      const drink = props.drinks?.find((drink) => drink.name === chosenDrink && drink.active);
      if (drink?.extras) {
        setAvailableExtras(drink.extras.split(","));
      } else {
        setAvailableExtras([]);
      }
    }
  }, [chosenDrink]);
  return (
    <Modal size="4xl" isDismissable={false} isOpen={true} onClose={props.close} classNames={{ body: "flex" }}>
      <ModalContent>
        {() => (
          <>
            <ModalBody className="text-secondary-950">
              <h2 className="font-semibold">Geef je bestelling door</h2>
              <hr />
              <div className="flex gap-3">
                {props.drinks?.map((drink) => {
                  if (drink.active)
                    return (
                      <Tooltip content={drink.name} key={drink._id}>
                        <Avatar
                          key={drink.name}
                          src={coffeeIcons[drink.icon]}
                          isBordered={drink.name == chosenDrink}
                          className="ring-primary-700 place-order-avatar"
                          onClick={() => setChosenDrink(drink.name)}
                        />
                      </Tooltip>
                    );
                })}
              </div>
              <CheckboxGroup label={chosenDrink && `Extra's voor bij ${chosenDrink}`} value={selectedExtras} onValueChange={setselectedExtras}>
                {availableExtras && availableExtras.map((extra) => <Checkbox value={extra}>{extra}</Checkbox>)}
              </CheckboxGroup>
              <Input type="text" label="Eventuele opmerking" onValueChange={setText} value={text} />
              <Button
                color="primary"
                onClick={() => props.placeOrder(chosenDrink, text, selectedExtras)}
                isDisabled={!!(chosenDrink.length < 1 || (text && !textIsValid))}>
                Geef mijn bestelling door
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PlaceOrder;
