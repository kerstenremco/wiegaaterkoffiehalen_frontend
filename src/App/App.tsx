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
    console.log("\x1b[33m%s\x1b[0m", `wiegaaterkoffiehalen.nl frontend versie ${import.meta.env.PACKAGE_VERSION} 🍺`);
    fetch("https://api.wiegaaterkoffiehalen.nl/api/v1/version").then(
      (response) => response.text().then((data) => console.log("\x1b[33m%s\x1b[0m", `wiegaaterkoffiehalen.nl backend versie ${data} 🔥`))
      // console.log("\x1b[33m%s\x1b[0m", `Backend versie ${data.text} \u{1F9E1}`)
    );
  }, []);
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
