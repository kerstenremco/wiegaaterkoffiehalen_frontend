import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";
// Init Cognito User Pool
const UserPoolId = import.meta.env.VITE_COGNITO_USERPOOL_ID;
const ClientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const userPool = new CognitoUserPool({ UserPoolId, ClientId });

// Get email of user from localstorage
export const getUser = async (): Promise<null | string> => {
  const currentUser = userPool.getCurrentUser();
  if (!currentUser) return null;
  let result: null | string = null;
  currentUser.getSession((err: Error, session: CognitoUserSession | null) => {
    if (!err && session != null) result = session.getIdToken().payload.email;
  });
  return result;
};

// Logs in a user, throws error when wrong credentials
export const signIn = async (email: string, password: string): Promise<void> => {
  const user = new CognitoUser({
    Username: email,
    Pool: userPool
  });

  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        // If invite code in url, clear
        const urlParams = new URLSearchParams(window.location.search);
        const inviteCode = urlParams.get("invite");
        if (inviteCode) {
          const replaceUrl = { title: "", url: "/" };
          history.replaceState(replaceUrl, replaceUrl.title, replaceUrl.url);
        }
        resolve();
      },
      onFailure: () => {
        reject("Verkeerde gebruikersnaam of wachtwoord");
      }
    });
  });
};

// Get access token of current user
export const loadAccessToken = async (): Promise<string> => {
  const currentUser = userPool.getCurrentUser();

  return new Promise((resolve, reject) => {
    if (!currentUser) return reject("No user logged in");
    currentUser.getSession((_err: Error, session: CognitoUserSession | null) => {
      if (!session) return reject("No user logged in");
      const refreshToken = session.getRefreshToken();
      currentUser.refreshSession(refreshToken, (_err, session: CognitoUserSession | null) => {
        if (!session) return reject("No user logged in");
        resolve(session.getAccessToken().getJwtToken());
      });
    });
  });
};

// Sign up a new user
export const signUp = (email: string, password: string): Promise<void> => {
  const attributeEmail = new CognitoUserAttribute({
    Name: "email",
    Value: email
  });
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, [attributeEmail], [], (err) => {
      if (err) {
        reject("Registreren mislukt. Heb je toevallig als een account?");
      } else {
        resolve();
      }
    });
  });
};

// Request code for password reset
export const requestCode = async (email: string) => {
  return new Promise<void>((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    });
    user.forgotPassword({
      onSuccess: () => {
        resolve();
      },
      onFailure: (err) => {
        reject(err);
      }
    });
  });
};

// Reset password
export const resetPassword = (email: string, code: string, password: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    });
    user.confirmPassword(code, password, {
      onSuccess() {
        resolve();
      },
      onFailure() {
        reject("Wachtwoord reset mislukt. Klopt de verificatiecode?");
      }
    });
  });
};

// Sign out
export const signOut = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const u = userPool.getCurrentUser();
    if (!u) return reject();
    u.signOut(() => {
      Object.keys(localStorage)
        .filter((x) => x.startsWith("Cognito"))
        .forEach((x) => localStorage.removeItem(x));
      return resolve();
    });
  });
};
