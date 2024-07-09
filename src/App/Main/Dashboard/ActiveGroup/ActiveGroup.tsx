import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../../Context/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import StartDrawing from "./Modals/StartDrawing";
import Result from "./result";
import NewGroupInfo from "./NewGroupInfo";
import NoActiveDrawing from "./NoActiveDrawing";

import PlaceOrder from "./Modals/PlaceOrder";
import ActiveDrawing from "./ActiveDrawing";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

import NoGroup from "./NoGroup";

type Props = {
  test?: string;
  onCreateNewGroup: () => void;
  onEditGroup: () => void;
};
export type SettingsContext = null | "profile" | "group";

const ActiveGroup: React.FC<Props> = (props) => {
  const mainContext = useContext(MainContext);
  if (!mainContext) throw new Error("No main context");
  const [state, setState] = useState<string | undefined>(undefined);

  const [startDrawing, setStartDrawing] = useState(false);
  const [placeOrder, setPlaceOrder] = useState(false);

  useEffect(() => {
    if (mainContext.myGroups.length == 0) return setState("noGroup");

    if (mainContext.currentGroup) {
      if (mainContext.currentGroup.members.length < 2) {
        return setState("newGroupInfo");
      }

      if (mainContext.currentGroup.activeDrawing) {
        return setState("activeDrawing");
      }
      if (
        !mainContext.currentGroup.activeDrawing &&
        mainContext.currentGroup.lastDrawing &&
        mainContext.currentGroup.lastDrawing.endsInSeconds > -300 &&
        mainContext.currentGroup.lastDrawing.who
      ) {
        return setState("result");
      }
      return setState("noActiveDrawing");
    }
    return setState(undefined);
  }, [mainContext.myGroups, mainContext.currentGroup]);

  const handleCommitOrder = async (chosenDrink: string, text?: string, extras?: string[]) => {
    const extraString = extras?.join(", ");
    await mainContext.placeOrderFunction(chosenDrink, text, extraString);
    setPlaceOrder(false);
  };

  const myOrder = mainContext.currentGroup?.activeDrawing?.orders.find((order) => order.user == mainContext.profile?.id);
  return (
    <>
      {startDrawing && <StartDrawing close={() => setStartDrawing(false)} startDrawing={mainContext.startDrawing} />}

      {placeOrder && <PlaceOrder close={() => setPlaceOrder(false)} placeOrder={handleCommitOrder} drinks={mainContext.currentGroup?.drinks} />}
      <div className="flex-1 flex h-screen">
        <div className="flex flex-col m-5 w-full">
          {mainContext.ownerOfCurrentGroup && (
            <FontAwesomeIcon
              data-cy="groupSettingsButton"
              size="2x"
              className="self-end hover:scale-110"
              icon={faSliders}
              onClick={props.onEditGroup}
            />
          )}
          <div className="flex flex-col flex-1 justify-center items-center gap-10 h-full" id="groupState">
            {state == "activeDrawing" && mainContext.currentGroup?.activeDrawing && (
              <ActiveDrawing
                self={mainContext.currentGroup.activeDrawing.self}
                startedBy={mainContext.currentGroup.activeDrawing.startedBy.name}
                seconds={mainContext.currentGroup.activeDrawing.endsInSeconds}
                placedOrder={myOrder != undefined}
                handlePlaceOrder={() => setPlaceOrder(true)}
              />
            )}
            {state == "newGroupInfo" && <NewGroupInfo />}
            {state == "noActiveDrawing" && <NoActiveDrawing setStartDrawing={() => setStartDrawing(true)} />}
            {state == "noGroup" && <NoGroup onCreateNewGroup={props.onCreateNewGroup} />}
            {state == "result" && (
              <Result
                who={mainContext.currentGroup?.lastDrawing?.who?.name || ""}
                self={mainContext.currentGroup?.lastDrawing?.who?.id == mainContext.profile?.id}
                startDrawing={() => setStartDrawing(true)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ActiveGroup;
