import { Button } from "@nextui-org/react";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";
import { coffeeMachine } from "../../../../assets/lottie";
import { useEffect, useState } from "react";
type Props = {
  self: boolean;
  startedBy: string;
  seconds: number;
  placedOrder: boolean;
  handlePlaceOrder: (chosenDrink: string, text?: string, extras?: string[]) => void;
};

const ActiveDrawing: React.FC<Props> = (props) => {
  const [remainingTime, setRemainingTime] = useState<number>(props.seconds);

  const fromTime = Math.round(Date.now() / 1000);
  const minutes = Math.floor(remainingTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remainingTime % 60).toString().padStart(2, "0");
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.round(Date.now() / 1000);
      const remainingTime = props.seconds - (now - fromTime);
      if (remainingTime >= 0) setRemainingTime(remainingTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="text-center font-extralight">
        <span className="text-5xl font-medium block">
          {minutes}:{seconds}
        </span>
        totdat de volgende koffieronden plaatsvindt
      </div>

      <Lottie loop animationData={coffeeMachine} play speed={0.1} segments={[34, 120]} style={{ maxHeight: 500, height: "60%" }} />
      {props.self && <p className=" text-center">Ps. {props.startedBy} haalt koffie voor jullie ;)</p>}
      {!props.self && <p className="text-center">Er vindt een loting plaats</p>}
      <Button className="xl:w-1/4" color="primary" isDisabled={props.placedOrder} variant="shadow" onClick={props.handlePlaceOrder}>
        Bestelling doorgeven
      </Button>
    </>
  );
};

export default ActiveDrawing;
