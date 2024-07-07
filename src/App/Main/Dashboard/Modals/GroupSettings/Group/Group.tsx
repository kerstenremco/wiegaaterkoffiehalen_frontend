import { Input } from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import { MainContext } from "../../../../../../Context/Main";

type Props = {
  updateValide: (valide: boolean) => void;
  confirmDispatched: boolean;
  resetConfirmDispatched: () => void;
};
const Group: React.FC<Props> = (props) => {
  const mainContext = useContext(MainContext);
  const originalName = mainContext?.currentGroup?.name || "";
  const [name, setName] = useState(originalName);
  useEffect(() => {
    const r = /^[a-z\s]+$/gi;
    const v = name.length > 2 && r.test(name) && name.length < 20 && name != originalName;
    props.updateValide(v);
  }, [name]);
  useEffect(() => {
    if (props.confirmDispatched) handleUpdate();
  }, [props.confirmDispatched]);
  // Functions
  const handleUpdate = async () => {
    await mainContext?.updateGroupFunction(name);
    props.resetConfirmDispatched();
  };
  return (
    <div className="grid gap-6">
      <Input type="text" label="Naam" onChange={(e) => setName(e.target.value)} value={name} />
    </div>
  );
};

export default Group;
