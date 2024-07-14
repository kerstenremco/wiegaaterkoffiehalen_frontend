import React from "react";
import { Member } from "../../../../api-sdk";

import User from "../../../../Components/layout/User";

type Props = {
  users?: Member[];
  onlineUsers: string[];
  ownUserId?: string;
};
const OnlineUsers: React.FC<Props> = (props) => {
  return (
    <div data-cy="onlineUsers" className="flex flex-col gap-2 items-start">
      {props.users?.map((user) => {
        if (!user.user.name) return; // User didn't create profile yet
        return (
          <User
            key={user.id}
            name={user.user.name}
            avatar={user.user.avatar}
            isOnline={props.onlineUsers.includes(user.user.id) || user.user.id == props.ownUserId}
          />
        );
      })}
      {props.users?.map((user) => {
        if (!user.user.name) return; // User didn't create profile yet
        return (
          <User
            key={user.id}
            name={user.user.name}
            avatar={user.user.avatar}
            isOnline={props.onlineUsers.includes(user.user.id) || user.user.id == props.ownUserId}
          />
        );
      })}
      {props.users?.map((user) => {
        if (!user.user.name) return; // User didn't create profile yet
        return (
          <User
            key={user.id}
            name={user.user.name}
            avatar={user.user.avatar}
            isOnline={props.onlineUsers.includes(user.user.id) || user.user.id == props.ownUserId}
          />
        );
      })}
    </div>
  );
};

export default OnlineUsers;
