import { AuthContext } from "../Context/Auth";
import { useContext, lazy, Suspense, useEffect } from "react";
import Login from "./Login/Login";
const Main = lazy(() => import("./Main/Main"));
const MainProvider = lazy(() => import("../Context/Main"));
import Loading from "./loading";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("No Auth context");
  const navigate = useNavigate();
  useEffect(() => {
    const url = window.location.href;
    if (!authContext.accessToken && !url.includes("/login")) {
      if (url.includes("/groups/")) {
        const groupId = url.split("/groups/")[1].split("/")[0];
        if (!groupId) navigate("/login");
        else {
          navigate(`/login?redirectToGroup=${groupId}`);
        }
      } else {
        navigate("/login");
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard/groups/:groupId/*"
        element={
          <>
            <Suspense fallback={<Loading />}>
              <MainProvider>
                <Main />
              </MainProvider>
            </Suspense>
          </>
        }
      />
    </Routes>
  );
};
export default App;
