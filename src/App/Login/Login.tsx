import { useState, useEffect, useContext } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Context
import { AuthContext } from "../../Context/Auth";
// Components
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ResetPasswordScreen1 from "./screens/ResetPasswordScreen1";
import ResetPasswordScreen2 from "./screens/ResetPasswordScreen2";
// Illustations
import { faUnlock, faAddressCard, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { boyGirlHoldingCoffee } from "../../assets/lottie";

import * as Api from "../../api-sdk";
const Login: React.FC = () => {
  // Load auth context
  const authContext = useContext(AuthContext);
  if (authContext == undefined) throw new Error("No auth context");
  // Set states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [formOk, setFormOk] = useState(false);
  const [mode, setMode] = useState<"login" | "register" | "reset1" | "reset2">("login");
  const [invite, setInvite] = useState<Api.MyInvite | null>(null);

  const fetchInvite = async (id: string) => {
    const configuration = new Api.Configuration({
      basePath: import.meta.env.VITE_API_PATH
    });
    const inviteApi = new Api.InviteApi(configuration);
    try {
      const invite = await inviteApi.inviteInviteIdGet({ inviteId: id });
      setInvite(invite);
      setEmail(invite.email);
      setMode("register");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("invite");
    if (id) fetchInvite(id);
  }, []);

  // On typing: Check if input fields are correct and clear any previous errors
  useEffect(() => {
    authContext.clearAuthenticationError();
    const emailValid = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (mode == "register" && emailValid && email.length > 6 && password.length > 6 && password == password2) setFormOk(true);
    else if (mode == "login" && emailValid && email.length > 6 && password.length > 6) setFormOk(true);
    else if (mode == "reset1" && emailValid && email.length > 6) setFormOk(true);
    else if (mode == "reset2" && verificationCode.length > 3 && password.length > 6 && password == password2) setFormOk(true);
    else setFormOk(false);
  }, [email, password, password2, mode, verificationCode]);

  // When switching mode, clear all states (except email)
  useEffect(() => {
    setPassword("");
    setPassword2("");
    setVerificationCode("");
  }, [mode]);

  const handleSignIn = () => !authContext.waitingForCognito && formOk && authContext.signIn(email, password);
  const handleSignUp = () => !authContext.waitingForCognito && formOk && authContext.signUp(email, password);
  const handleRequestCode = async () => {
    if (authContext.waitingForCognito || !formOk) return;
    await authContext.requestCode(email);
    setMode("reset2");
  };
  const handleResetPassword = async () => {
    if (!authContext.waitingForCognito && formOk) {
      try {
        await authContext.resetPassword(email, verificationCode, password);
        setMode("login");
      } catch (e) {
        console.error(2, e);
      }
    }
  };

  const icon = mode == "register" ? faAddressCard : mode == "login" ? faUnlock : faCircleQuestion;

  return (
    <div className="flex h-full align-items-center">
      <div className="flex w-11/12 xl:w-auto max-w-7xl items-center m-auto">
        <Card className="h-min w-full xl:min-w-[780px] p-8">
          <CardHeader></CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4 items-center flex-1" id="loginSecond">
              <FontAwesomeIcon icon={icon} size="3x" />
              {authContext.authenticationError && (
                <div className="border-danger border-medium rounded-medium px-unit-4 text-center self-stretch">{authContext.authenticationError}</div>
              )}
              {authContext.authenticationMessage && (
                <div className="border-teal-400 border-medium rounded-medium px-unit-4 text-center self-stretch">
                  {authContext.authenticationMessage}
                </div>
              )}

              {mode == "login" && (
                <LoginScreen
                  onForgotPassword={() => setMode("reset1")}
                  onSignInCurrentUser={authContext.signInCurrentUser}
                  isLoading={false}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  onRegister={() => setMode("register")}
                  emailOfCurrentUser={authContext.emailOfCurrentUser}
                  onSignIn={handleSignIn}
                  formIsValid={formOk}
                />
              )}
              {mode == "register" && (
                <RegisterScreen
                  isLoading={false}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  formIsValid={formOk}
                  confirmPassword={password2}
                  inviteSendBy={invite?.sendBy || null}
                  setConfirmPassword={setPassword2}
                  onSignUp={handleSignUp}
                  onSignin={() => setMode("login")}
                />
              )}
              {mode == "reset1" && (
                <ResetPasswordScreen1
                  email={email}
                  setEmail={setEmail}
                  onSubmit={handleRequestCode}
                  isLoading={authContext.waitingForCognito}
                  formIsValid={formOk}
                  onSignin={() => setMode("login")}
                />
              )}
              {mode == "reset2" && (
                <ResetPasswordScreen2
                  onSignin={() => setMode("login")}
                  setPassword={setPassword}
                  setConfirmPassword={setPassword2}
                  confirmPassword={password2}
                  setVerificationCode={setVerificationCode}
                  verificationCode={verificationCode}
                  isLoading={authContext.waitingForCognito}
                  password={password}
                  formIsValid={formOk}
                  onSubmit={handleResetPassword}
                />
              )}
            </div>
          </CardBody>
        </Card>
        <Lottie loop animationData={boyGirlHoldingCoffee} play speed={0.1} segments={[34, 120]} className="hidden xl:block" />
      </div>
    </div>
  );
};

export default Login;

// Blueprint
{
  /* <div className="flex h-full align-items-center	">
  <div className="flex w-4/5 max-w-7xl items-center m-auto">
    <Card className="w-1/2 h-min">
      <CardHeader></CardHeader>
      <CardBody></CardBody>
    </Card>
    <Image removeWrapper className="mx-auto" id="loginFirst" src="https://app.wiegaaterkoffiehalen.nl/static/illustrations/get-coffee.svg" />
  </div>
</div>; */
}
