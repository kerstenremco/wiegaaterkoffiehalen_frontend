import { Button, Image, Tooltip } from "@nextui-org/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { MainContext } from "../../../../../../Context/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drink as IDrink } from "../../../../../../api-sdk";
import coffeeIcons from "../../../../../../assets/coffee-icons";
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import EditDrinkModal from "./EditDrinkModal";
import RemoveDrinkModal from "./RemoveDrinkModal";

type Props = {
  updateValide: (valide: boolean) => void;
  onClose: () => void;
};
const Drinks: React.FC<Props> = (props) => {
  // Context
  const mainContext = useContext(MainContext);
  if (!mainContext || !mainContext.currentGroup) throw new Error("No Main context");
  // States
  const [drinkToRemove, setDrinkToRemove] = useState<string | undefined>(undefined);
  const [editingDrink, setEditingDrink] = useState<IDrink | undefined>(undefined);
  const [addingNewDrink, setAddingNewDrink] = useState(false);
  const [drinksMax, setDrinksMax] = useState(false);
  // Effects
  useEffect(() => {
    if (!mainContext.currentGroup?.drinks) return;
    if (mainContext.currentGroup?.drinks.filter((d) => d.active).length >= 10) setDrinksMax(true);
    else setDrinksMax(false);
  }, [mainContext.currentGroup?.drinks]);
  // Functions
  const closeAddDrinkModal = () => {
    setEditingDrink(undefined);
    setAddingNewDrink(false);
  };
  const handleEditDrink = (id: string) => {
    const drink = mainContext.currentGroup?.drinks.find((d) => d.id == id);
    setEditingDrink(drink);
  };
  const handleUpdateDrink = (name: string, icon: string, extras: string) => {
    if (!editingDrink?.id) {
      // Create new drink
      mainContext.createDrinkFunction(name, icon, extras);
    } else {
      mainContext.updateDrinkFunction(editingDrink?.id, name, icon, extras);
    }
    closeAddDrinkModal();
  };
  const handleRemoveDrink = () => {
    if (drinkToRemove) mainContext.deleteDrinkFunction(drinkToRemove);
    setDrinkToRemove(undefined);
  };

  return (
    <>
      {(editingDrink || addingNewDrink) && <EditDrinkModal close={closeAddDrinkModal} addDrink={handleUpdateDrink} editingDrink={editingDrink} />}
      {drinkToRemove && (
        <RemoveDrinkModal
          removeDrink={mainContext.currentGroup.drinks.find((d) => d.id == drinkToRemove)?.name}
          onClose={() => setDrinkToRemove(undefined)}
          onConfirm={handleRemoveDrink}
        />
      )}
      <div data-cy="groupSettingsDrinkItems" className="flex flex-col gap-3 mt-3">
        {mainContext.currentGroup.drinks.map((drink) => {
          const iconIsValid = Object.prototype.hasOwnProperty.call(coffeeIcons, drink.icon);
          const icon = iconIsValid ? coffeeIcons[drink.icon] : coffeeIcons.coffeeCup;
          if (drink.active)
            return (
              <Fragment key={drink.id}>
                <div className="flex gap-1 items-center">
                  <Image src={icon} alt={drink.name} width={32} height={32} />
                  <span className="flex-1">{drink.name}</span>
                  <FontAwesomeIcon
                    data-cy="groupSettingsDrinkItemsEdit"
                    size="lg"
                    className="hover:scale-125"
                    icon={faSquarePen}
                    onClick={() => handleEditDrink(drink.id)}
                  />
                  <FontAwesomeIcon
                    data-cy="groupSettingsDrinkItemsRemove"
                    size="lg"
                    className="scale-90 hover:scale-105 text-danger-LIGHT hover:text-danger"
                    icon={faTrashCan}
                    onClick={() => setDrinkToRemove(drink.id)}
                  />
                </div>
                <hr />
              </Fragment>
            );
        })}
      </div>
      <Tooltip content="Maximaal 10 drankjes per groep" color="danger" isDisabled={!drinksMax} placement="bottom">
        <span>
          <Button color="primary" fullWidth onClick={() => setAddingNewDrink(true)} isDisabled={drinksMax}>
            Nieuw drankje toevoegen
          </Button>
        </span>
      </Tooltip>
    </>
  );
};

export default Drinks;
