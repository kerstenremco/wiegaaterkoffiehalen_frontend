import { AuthContext } from "../Context/Auth";
import { useContext, lazy, Suspense } from "react";
import Login from "./Login/Login";
const Main = lazy(() => import("./Main/Main"));
const MainProvider = lazy(() => import("../Context/Main"));
import Loading from "./loading";

const App: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("No Auth context");
  return (
    <>
      {authContext.accessToken && (
        <Suspense fallback={<Loading />}>
          <MainProvider>
            <Main />
          </MainProvider>
        </Suspense>
      )}
      {!authContext.accessToken && <Login />}
    </>
  );
};

export default App;
