import Lottie from "react-lottie-player/dist/LottiePlayerLight";
import { makingCoffee } from "../assets/lottie";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 h-full w-full justify-center">
      <Lottie className="max-w-96 mx-auto" loop animationData={makingCoffee} play speed={0.1} segments={[34, 120]} />
      <p className="text-center">Even geduld...</p>
    </div>
  );
};

export default Loading;
