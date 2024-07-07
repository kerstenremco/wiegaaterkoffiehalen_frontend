import Button from "../../../Components/layout/Button";
import { Password, VerificationCode } from "../Fields";

type ResetPasswordScreen2Props = {
  onSignin: () => void;
  setPassword: (email: string) => void;
  setConfirmPassword: (email: string) => void;
  confirmPassword: string;
  setVerificationCode: (email: string) => void;
  verificationCode: string;
  isLoading: boolean;
  password: string;
  formIsValid: boolean;
  onSubmit: () => void;
};
const ResetPasswordScreen2: React.FC<ResetPasswordScreen2Props> = (props) => {
  return (
    <>
      <div className="border-info border-medium rounded-medium px-unit-4 text-center self-stretch">Controleer je e-mail voor de verificatiecode!</div>
      <VerificationCode setVerificationCode={props.setVerificationCode} handleSubmit={props.onSubmit} value={props.verificationCode} />
      <Password setPassword={props.setPassword} handleSubmit={props.onSubmit} value={props.password} label="Wachtwoord (minimaal 6 karakters)" />
      <Password setPassword={props.setConfirmPassword} handleSubmit={props.onSubmit} value={props.confirmPassword} label="Herhaal wachtwoord" />
      <Button onClick={props.onSubmit} isLoading={props.isLoading} isDisabled={!props.formIsValid}>
        Wachtwoord resetten
      </Button>
      <p onClick={props.onSignin}>
        Wachtwoord toch nog bekend? <span className="text-primary font-semibold cursor-pointer">Inloggen</span>
      </p>
    </>
  );
};

export default ResetPasswordScreen2;
