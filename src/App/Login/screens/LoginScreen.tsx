import Button from "../../../Components/layout/Button";
import { Email, Password } from "../Fields";

type LoginScreenProps = {
  onSignInCurrentUser: () => void;
  onSignIn: () => void;
  onForgotPassword: () => void;
  onRegister: () => void;
  setEmail: (email: string) => void;
  email: string;
  setPassword: (password: string) => void;
  password: string;
  isLoading: boolean;
  emailOfCurrentUser: string | null;
  formIsValid: boolean;
};
const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  return (
    <>
      {props.emailOfCurrentUser && (
        <Button bordered onClick={props.onSignInCurrentUser} isLoading={props.isLoading}>
          Ga door als {props.emailOfCurrentUser}
        </Button>
      )}
      <Email setEmail={props.setEmail} handleSubmit={props.onSignIn} value={props.email} isInvite={false} />
      <div className="w-full">
        <Password setPassword={props.setPassword} handleSubmit={props.onSignIn} value={props.password} label="Wachtwoord" />
        <p className="text-xs text-danger text-right p-2 cursor-pointer" onClick={props.onForgotPassword}>
          Wachtwoord vergeten?
        </p>
      </div>
      <Button onClick={props.onSignIn} isLoading={props.isLoading} isDisabled={!props.formIsValid}>
        Inloggen
      </Button>
      <p onClick={props.onRegister}>
        Heb je nog geen account? <span className="text-primary font-semibold cursor-pointer">Registreren</span>
      </p>
    </>
  );
};

export default LoginScreen;
