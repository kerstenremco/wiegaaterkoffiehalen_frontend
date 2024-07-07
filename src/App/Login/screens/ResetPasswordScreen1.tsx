import Button from "../../../Components/layout/Button";
import { Email } from "../Fields";

type ResetPasswordScreen1Props = {
  onSignin: () => void;
  setEmail: (email: string) => void;
  isLoading: boolean;
  email: string;
  formIsValid: boolean;
  onSubmit: () => void;
};
const ResetPasswordScreen1: React.FC<ResetPasswordScreen1Props> = (props) => {
  return (
    <>
      <Email setEmail={props.setEmail} handleSubmit={props.onSubmit} value={props.email} />
      <Button onClick={props.onSubmit} isLoading={props.isLoading} isDisabled={!props.formIsValid}>
        Volgende
      </Button>
      <p onClick={props.onSignin}>
        Wachtwoord toch nog bekend? <span className="text-primary font-semibold cursor-pointer">Inloggen</span>
      </p>
    </>
  );
};

export default ResetPasswordScreen1;
