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
  const minutes = Math.floor(remainingTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remainingTime % 60).toString().padStart(2, "0");
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((old) => old - 1);
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <>
      <div className="text-center font-extralight">
        <span className="text-5xl font-medium block">
          {minutes}:{seconds}
        </span>
        totdat de volgende koffieronden plaatsvindt
      </div>

      <Lottie loop animationData={coffeeMachine} play speed={0.1} segments={[34, 120]} style={{ height: 500 }} />
      {props.self && <p className=" text-center">Ps. {props.startedBy} haalt koffie voor jullie ;)</p>}
      {!props.self && <p className="text-center">Er vindt een loting plaats</p>}
      <Button className="w-1/4" color="primary" isDisabled={props.placedOrder} variant="shadow" onClick={props.handlePlaceOrder}>
        Bestelling doorgeven
      </Button>
    </>
  );
};

export default ActiveDrawing;
