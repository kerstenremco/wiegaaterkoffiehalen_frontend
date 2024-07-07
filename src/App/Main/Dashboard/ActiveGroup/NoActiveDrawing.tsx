import { Button as B } from "@nextui-org/react";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";
import { together } from "../../../../assets/lottie";

const NoActiveDrawing: React.FC<{ setStartDrawing: () => void }> = (props) => {
  return (
    <>
      <Lottie loop animationData={together} play speed={0.1} segments={[34, 120]} style={{ height: 500 }} />
      <B className="w-1/4" color="primary" variant="shadow" onClick={props.setStartDrawing}>
        Koffieronde starten
      </B>
    </>
  );
};

export default NoActiveDrawing;
