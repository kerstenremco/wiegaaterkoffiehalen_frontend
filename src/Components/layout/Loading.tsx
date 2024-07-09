import FullCenter from "./FullCenter";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";
import { coffeeMachine } from "../../assets/lottie";

const Loading: React.FC<{ text: string }> = (props) => {
  return (
    <FullCenter>
      <Lottie loop animationData={coffeeMachine} play speed={0.1} segments={[34, 120]} style={{ maxHeight: 500, height: "60%" }} />
      <p className="text-2xl text-secondary-950">{props.text}</p>
    </FullCenter>
  );
};

export default Loading;
