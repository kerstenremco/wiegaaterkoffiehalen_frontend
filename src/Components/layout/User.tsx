import React from "react";
import { Badge, Avatar } from "@nextui-org/react";
const avatarUrl = import.meta.env.VITE_AVATAR_URL;

const ProfilePicture: React.FC<{ avatar?: string }> = (props) => {
  const a = props.avatar || "undefined";
  return <Avatar src={`${avatarUrl}${a}`} />;
};

type Props = {
  children?: React.ReactNode;
  isOnline: boolean;
  name: string;
  avatar?: string;
};

const User: React.FC<Props> = (props) => {
  return (
    <div className="flex gap-2 items-center">
      <Badge content="" color={props.isOnline ? "success" : "danger"} shape="circle" placement="bottom-right">
        <ProfilePicture avatar={props.avatar} />
      </Badge>
      <p className="hidden xl:block">{props.name}</p>
    </div>
  );
};

export default User;
