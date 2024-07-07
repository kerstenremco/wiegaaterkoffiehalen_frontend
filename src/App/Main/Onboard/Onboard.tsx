import { Button, Card, CardBody, Input, CardHeader } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import Emojis from "../../../Components/Emojis";
import { MainContext } from "../../../Context/Main";
import useValidator from "../../../hooks/useValidator";
import { woman } from "../../../assets/lottie";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";

// type Props = {
//   name?: string;
//   avatar?: string;
//   phone?: string;
//   handleSubmit: (name: string, avatar: string, isInitSetup: boolean, verificationCode: string) => void;
//   isLoading: boolean;
//   error?: string;
// };
const Onboard: React.FC = () => {
  // Context
  const mainContext = useContext(MainContext);
  if (!mainContext) throw new Error("No Main context");

  // States
  const [name, setName] = useState<string | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [verificationCode, setVerificationCode] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const nameValide = useValidator([{ value: name, min: 3, max: 20, regex: /^[a-z\s]+$/gi }]);

  // Hooks
  const verificationCodeValide = useValidator([{ value: verificationCode, min: 6, max: 6, regex: /^[0-9]+$/gi }]);

  // Effects
  // Load profile
  useEffect(() => {
    if (mainContext.profile) {
      setName(mainContext.profile.name);
      setAvatar(mainContext.profile.avatar);
    }
  }, []);

  // Functions
  const handleSubmit = async () => {
    if (!name || !avatar || !verificationCode) return;
    setIsLoading(true);
    try {
      await mainContext.updateProfileFunction(name, avatar, true, verificationCode);
    } catch (e) {
      setError("Mislukt. Klopt de verificatiecode?");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full align-items-center">
      <div className="flex w-4/5 max-w-7xl items-center m-auto">
        <Card className="w-3/5 h-min p-8">
          <CardHeader></CardHeader>
          <CardBody>
            <div className="flex flex-row items-center gap-6">
              <div className="flex flex-col gap-4 items-center flex-1" id="loginSecond">
                <h1>Welkom! Stel jezelf even voor</h1>
                {error && <div className="border-danger border-medium rounded-medium px-unit-4 text-center self-stretch">{error}</div>}
                <Input
                  type="text"
                  label="Verificatiecode (per email ontvangen)"
                  onChange={(e) => setVerificationCode(e.target.value)}
                  isRequired
                  // onKeyDown={(e) => e.key == "Enter" && props.handleSubmit()}
                  value={verificationCode}
                />
                <Input
                  type="text"
                  label="Je naam"
                  onChange={(e) => setName(e.target.value)}
                  isRequired
                  // onKeyDown={(e) => e.key == "Enter" && props.handleSubmit()}
                  value={name}
                />
                <Emojis current={avatar} onClick={(filename) => setAvatar(filename)} />
                <Button
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  isDisabled={!nameValide || !verificationCodeValide || !avatar}
                  fullWidth
                  color="primary">
                  Profiel aanmaken
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
        <Lottie loop animationData={woman} play speed={0.1} style={{ width: 500 }} />
      </div>
    </div>
  );
};

export default Onboard;
