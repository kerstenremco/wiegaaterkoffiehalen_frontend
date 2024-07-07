import Button from "../../../Components/layout/Button";
import { Email, Password } from "../Fields";

type RegisterScreenProps = {
  inviteSendBy: string | null;
  setEmail: (email: string) => void;
  email: string;
  setPassword: (password: string) => void;
  password: string;
  setConfirmPassword: (password: string) => void;
  confirmPassword: string;
  onSignUp: () => void;
  isLoading: boolean;
  formIsValid: boolean;
  onSignin: () => void;
};
const RegisterScreen: React.FC<RegisterScreenProps> = (props) => {
  return (
    <>
      {props.inviteSendBy && (
        <div className="border-info border-medium rounded-medium px-unit-4 text-center self-stretch">{`${props.inviteSendBy} heeft je uitgenodigd`}</div>
      )}
      <Email setEmail={props.setEmail} handleSubmit={props.onSignUp} value={props.email} isInvite={props.inviteSendBy != null} />
      <Password setPassword={props.setPassword} handleSubmit={props.onSignUp} value={props.password} label="Wachtwoord (minimaal 6 karakters)" />
      <Password setPassword={props.setConfirmPassword} handleSubmit={props.onSignUp} value={props.confirmPassword} label="Herhaal wachtwoord" />
      <Button onClick={props.onSignUp} isLoading={props.isLoading} isDisabled={!props.formIsValid}>
        Registreren
      </Button>
      <p onClick={props.onSignin}>
        Heb je al een account? <span className="text-primary font-semibold cursor-pointer">Inloggen</span>
      </p>
    </>
  );
};

export default RegisterScreen;
