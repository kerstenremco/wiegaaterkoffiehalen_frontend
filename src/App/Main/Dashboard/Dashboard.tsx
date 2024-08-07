import Sidebar from "./Sidebar/Sidebar";
import { useState } from "react";
import NewGroup from "./Modals/NewGroup/NewGroup";
import ActiveGroup from "./ActiveGroup/ActiveGroup";
import ProfileSettings from "./Modals/ProfileSettings/ProfileSettings";
import PhoneSettings from "./Modals/PhoneSettings/PhoneSettings";
import GroupSettings from "./Modals/GroupSettings/GroupSettings";

const Dashboard: React.FC = () => {
  const [editProfileIsActive, setEditProfileIsActive] = useState(false);
  const [editPhoneIsActive, setEditPhoneIsActive] = useState(false);
  const [editGroupIsActive, setEditGroupIsActive] = useState(false);
  const [createNewGroupIsActive, setCreateNewGroupIsActive] = useState(false);
  return (
    <>
      <NewGroup onClose={() => setCreateNewGroupIsActive(false)} isOpen={createNewGroupIsActive} />
      <ProfileSettings
        onClose={() => setEditProfileIsActive(false)}
        isOpen={editProfileIsActive}
        onEditPhoneNumber={() => setEditPhoneIsActive(true)}
      />
      <PhoneSettings onClose={() => setEditPhoneIsActive(false)} isOpen={editPhoneIsActive} />
      <GroupSettings onClose={() => setEditGroupIsActive(false)} isOpen={editGroupIsActive} />
      <div className="flex h-svh fixed xl:static w-full">
        <Sidebar onCreateNewGroup={() => setCreateNewGroupIsActive(true)} onEditProfile={() => setEditProfileIsActive(true)} />

        <ActiveGroup onCreateNewGroup={() => setCreateNewGroupIsActive(true)} onEditGroup={() => setEditGroupIsActive(true)} />
      </div>
    </>
  );
};

export default Dashboard;
