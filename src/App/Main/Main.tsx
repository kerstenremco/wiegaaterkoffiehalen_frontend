import { MainContext } from "../../Context/Main";
import { useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import Onboard from "./Onboard/Onboard";
import Alert from "./Alert";
import Loading from "../loading";

const Main: React.FC = () => {
  const mainContext = useContext(MainContext);
  if (!mainContext) throw new Error("No Main context");
  const [isNewUser, setIsNewUser] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (!mainContext.profile) return;
    if ((!mainContext.profile.name || !mainContext.profile.avatar) && mainContext.profile.email) {
      setIsNewUser(true);
    } else {
      setIsNewUser(false);
    }
  }, [mainContext.profile]);
  return (
    <>
      <Alert message={mainContext.alertMessage} onClose={mainContext.acknowledgeAlert} />
      {isNewUser == undefined && <Loading />}
      {isNewUser == true && <Onboard />}
      {isNewUser == false && <Dashboard />}
    </>
  );
};

export default Main;
