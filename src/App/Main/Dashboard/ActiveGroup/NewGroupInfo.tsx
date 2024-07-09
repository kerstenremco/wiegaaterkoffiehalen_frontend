import Lottie from "react-lottie-player/dist/LottiePlayerLight";
import { group } from "../../../../assets/lottie";
const NewGroupInfo: React.FC = () => {
  return (
    <>
      <Lottie loop animationData={group} play speed={0.1} segments={[34, 120]} style={{ maxHeight: 500, height: "60%" }} />
      <p className="text-center">
        Geweldig, je hebt een nieuwe groep aangemaakt.
        <br />
        Voeg om te beginnen enkele collega's toe via de groepsinstellingen rechtsbovenin het scherm
      </p>
    </>
  );
};

export default NewGroupInfo;
