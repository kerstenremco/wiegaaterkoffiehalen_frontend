import { Button } from "@nextui-org/react";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";
import { makingCoffee } from "../../../../assets/lottie";

const Result: React.FC<{ who: string; self: boolean; startDrawing: () => void }> = (props) => {
  return (
    <>
      <div className="text-center font-extralight">
        {props.self ? "Heb jij even pech!" : "Heb jij even geluk!"}
        <span className="text-5xl font-medium block">{props.self ? "Jij moet koffie halen!" : `Koffie wordt gehaald door ${props.who}`}</span>
      </div>
      <Lottie loop animationData={makingCoffee} play speed={0.1} segments={[34, 120]} style={{ height: 500 }} />
      {props.self && "We hebben je een e-mail gestuurd met de bestelling"}
      <Button className="w-1/4" color="primary" variant="shadow" onClick={props.startDrawing}>
        Nieuwe koffieronde starten
      </Button>
    </>
  );
};

export default Result;
