import React, { useContext } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { AuthContext } from "../../../../Context/Auth";
const avatarUrl = import.meta.env.VITE_AVATAR_URL;

type Props = { name: string; avatar: string; openSettings: () => void };

const ProfileMenu: React.FC<Props> = (props) => {
  const authContext = useContext(AuthContext);
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="bg-primary-200 p-2 flex cursor-pointer rounded-lg">
          <User
            name={props.name}
            avatarProps={{
              src: `${avatarUrl}${props.avatar}`
            }}
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Actions">
        <DropdownItem key="edit" onClick={props.openSettings}>
          Instellingen
        </DropdownItem>
        <DropdownItem key="logout" className="text-danger" color="danger" onClick={authContext?.signOut}>
          Uitloggen
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileMenu;
