import { createContext, useEffect, useState } from "react";
import * as authUtils from "../utils/auth";
import { useNavigate } from "react-router-dom";

type SignIn = (email: string, password: string) => Promise<void>;
type SignInCurrentUser = () => Promise<void>;
type SignUp = (email: string, password: string) => Promise<void>;
type ResetPassword = (email: string, code: string, password: string) => Promise<void>;
type RequestCode = (email: string) => Promise<void>;
type SignOut = () => void;

interface IAuthContext {
  authenticationError: string | null;
  authenticationMessage: string | null;
  signIn: SignIn;
  accessToken: string | undefined;
  signOut: SignOut;
  signUp: SignUp;
  waitingForCognito: boolean;
  requestCode: RequestCode;
  resetPassword: ResetPassword;
  signInCurrentUser: SignInCurrentUser;
  emailOfCurrentUser: string | null;
  clearAuthenticationError: () => void;
  clearAuthenticationMessage: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

const Auth: React.FC<Props> = (props) => {
  const [emailOfCurrentUser, setEmailOfCurrentUser] = useState<string | null>(null);
  const [authenticationError, setAuthenticationError] = useState<string | null>(null);
  const [authenticationMessage, setAuthenticationMessage] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [waitingForCognito, setWaitingForCognito] = useState(false);
  const navigate = useNavigate();

  // Funtions
  const signIn: SignIn = async (email, password) => {
    setAuthenticationMessage(null);
    setWaitingForCognito(true);
    try {
      await authUtils.signIn(email, password);
      const accessToken = await authUtils.loadAccessToken();
      setAccessToken(accessToken);
      const urlParams = new URLSearchParams(window.location.search);
      const redirectToGroup = urlParams.get("redirectToGroup");
      if (redirectToGroup) navigate(`/dashboard/groups/${redirectToGroup}`);
      else navigate("/dashboard/groups/default");
    } catch (e) {
      if (typeof e == "string") setAuthenticationError(e);
      else setAuthenticationError("Er is iets fout gegaan");
    } finally {
      setWaitingForCognito(false);
    }
  };

  const signInCurrentUser: SignInCurrentUser = async () => {
    setWaitingForCognito(true);
    try {
      const accessToken = await authUtils.loadAccessToken();
      setAccessToken(accessToken);
      const urlParams = new URLSearchParams(window.location.search);
      const redirectToGroup = urlParams.get("redirectToGroup");
      if (redirectToGroup) navigate(`/dashboard/groups/${redirectToGroup}`);
      else navigate("/dashboard/groups/default");
    } catch (e) {
      if (typeof e == "string") setAuthenticationError(e);
      else setAuthenticationError("Er is iets fout gegaan");
    } finally {
      setWaitingForCognito(false);
    }
  };

  const signUp: SignUp = async (email, password) => {
    setWaitingForCognito(true);
    try {
      await authUtils.signUp(email, password);
      await signIn(email, password);
      const navigate = useNavigate();
      const urlParams = new URLSearchParams(window.location.search);
      const redirectToGroup = urlParams.get("redirectToGroup");
      if (redirectToGroup) navigate(`/dashboard/groups/${redirectToGroup}`);
      else navigate("/dashboard/groups/default");
    } catch (e) {
      if (typeof e == "string") setAuthenticationError(e);
      else setAuthenticationError("Er is iets fout gegaan");
    } finally {
      setWaitingForCognito(false);
    }
  };

  const requestCode: RequestCode = async (email) => {
    setWaitingForCognito(true);
    try {
      await authUtils.requestCode(email);
    } catch (e) {
      if (typeof e == "string") setAuthenticationError(e);
      else setAuthenticationError("Er is iets fout gegaan");
    } finally {
      setWaitingForCognito(false);
    }
  };

  const resetPassword: ResetPassword = async (email, code, password) => {
    setWaitingForCognito(true);
    try {
      await authUtils.resetPassword(email, code, password);
      setAuthenticationMessage("Wachtwoord is aangepast. Je kan nu weer inloggen.");
    } catch (e) {
      if (typeof e == "string") setAuthenticationError(e);
      else setAuthenticationError("Er is iets fout gegaan");
    } finally {
      setWaitingForCognito(false);
    }
  };

  const signOut: SignOut = async () => {
    await authUtils.signOut();
    setAccessToken(undefined);
    setEmailOfCurrentUser(null);
    navigate("/login");
  };

  // Check if user is already logged in
  const checkIfUserIsLoggedIn = async () => {
    try {
      const email = await authUtils.getUser();
      setEmailOfCurrentUser(email);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const providerValue = {
    authenticationError,
    authenticationMessage,
    signIn,
    accessToken,
    signOut,
    signUp,
    waitingForCognito,
    requestCode,
    resetPassword,
    signInCurrentUser,
    emailOfCurrentUser,
    clearAuthenticationError: () => setAuthenticationError(null),
    clearAuthenticationMessage: () => setAuthenticationMessage(null)
  };
  //TODO: Herschijven
  return <AuthContext.Provider value={providerValue}>{props.children}</AuthContext.Provider>;
};

export default Auth;
