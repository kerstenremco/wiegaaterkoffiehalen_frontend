import { useContext } from "react";
import GroupMenu from "./GroupMenu";
import ProfileMenu from "./ProfileMenu";
import OnlineUsers from "./OnlineUsers";
import { Divider } from "@nextui-org/react";
import { MainContext } from "../../../../Context/Main";
interface Props {
  onCreateNewGroup: () => void;
  onEditProfile: () => void;
}
const Sidebar: React.FC<Props> = (props) => {
  // Load context
  const mainContext = useContext(MainContext);
  if (!mainContext) throw new Error("No Main context");
  const { profile, myGroups } = mainContext;
  if (!profile) throw new Error("No profile found in Main context");
  if (!myGroups) throw new Error("No groups found in Main context");
  return (
    <div className="flex-none w-80 bg-primary-100 flex flex-col p-4" id="bar">
      {/* <GroupMenu onAddGroup={() => setCreateNewGroup(true)} /> */}
      <GroupMenu
        onCreateNewGroup={props.onCreateNewGroup}
        groups={myGroups}
        onClickGroup={mainContext.loadGroup}
        currentGroupName={mainContext.currentGroup?.name}
      />
      <Divider className="my-4" />
      <div className="grow">
        <OnlineUsers users={mainContext.currentGroup?.members} onlineUsers={mainContext.onlineMembers} ownUserId={mainContext.profile?.id} />
      </div>
      <div>
        <Divider className="my-4" />
        <ProfileMenu name={profile.name!} avatar={profile.avatar!} openSettings={props.onEditProfile} />
      </div>
    </div>
  );
};

export default Sidebar;
