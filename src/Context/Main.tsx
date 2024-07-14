import { createContext, useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "./Auth";
import { Profile, GroupMember, Group, MemberAddedMessageEnum } from "../api-sdk";
import { io } from "socket.io-client";
import * as Api from "../api-sdk";
import { useParams, Navigator, useNavigation, useNavigate } from "react-router-dom";

const configuration = new Api.Configuration({
  basePath: import.meta.env.VITE_API_PATH
});

// type SignIn = (email: string, password: string) => Promise<void>;
interface IMainContext {
  profile?: Profile;
  myGroups: GroupMember[];
  currentGroup?: Group;
  ownerOfCurrentGroup: boolean;
  onlineMembers: string[];
  loadGroup: (groupId: string) => void;
  updateProfileFunction: (options: {
    name?: string;
    avatar?: string;
    InitSetup?: boolean;
    verificationCode?: string;
    phoneNumber?: string;
    phoneNumberVerificationCode?: string;
  }) => Promise<void>;
  updateGroupFunction: (name: string) => Promise<void>;
  deleteGroupFunction: () => Promise<void>;
  createGroupFunction: (name: string) => Promise<void>;
  createDrinkFunction: (name: string, icon: string, extras: string) => Promise<void>;
  updateDrinkFunction: (drinkId: string, name: string, icon: string, extras: string) => Promise<void>;
  deleteDrinkFunction: (drinkId: string) => Promise<void>;
  toggleNotificationFunction: (groupId: string, method: string, value: boolean) => Promise<void>;
  placeOrderFunction: (drink: string, text?: string, extras?: string) => Promise<void>;
  addMemberFunction: (email: string, isInvite: boolean) => Promise<MemberAddedMessageEnum | undefined>;
  changeMemberOwner: (userId: string, isOwner: boolean) => Promise<void>;
  removeMemberFunction: (userId: string, invite: boolean) => Promise<void>;
  startDrawing: (seconds: number, self: boolean) => Promise<void>;
  alertMessage?: string;
  acknowledgeAlert: () => void;
}

export const MainContext = createContext<IMainContext | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

const Main: React.FC<Props> = (props) => {
  const authContext = useContext(AuthContext);
  const { groupId } = useParams();
  const navigate = useNavigate();
  if (!authContext || typeof authContext.accessToken != "string") throw new Error("No Auth context");
  const accessToken = authContext.accessToken;
  // States
  const socket = useRef<Socket | null>(null);
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [myGroups, setMyGroups] = useState<GroupMember[]>([]);
  const [currentGroupId, setCurrentGroupId] = useState<string | undefined>(undefined);
  const [currentGroup, setCurrentGroup] = useState<Group | undefined>(undefined);
  const [ownerOfCurrentGroup, setOwnerOfCurrentGroup] = useState(false);
  const [onlineMembers, setOnlineMembers] = useState<string[]>([]);
  const [socketMessages, setSocketMessages] = useState<[string, any][]>([]);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);
  const providerValue: IMainContext = {
    profile,
    myGroups,
    currentGroup,
    ownerOfCurrentGroup,
    onlineMembers,
    alertMessage
  };

  // Socket
  const socketUrl = import.meta.env.VITE_SOCKET_URL;
  useEffect(() => {
    const i = setInterval(() => {
      if (!socket.current?.connected) {
        console.log("Lost socket connection, reconnecting....");
        socket.current?.connect();
      }
    }, 5000);
    socket.current = io(socketUrl);
    function onConnect() {
      socket.current.emit("auth", authContext?.accessToken);
      if (currentGroupId)
        socket.current.emit("switchGroup", {
          token: accessToken,
          message: currentGroupId
        });
    }

    const userOnline = (m) => setSocketMessages((prev) => [...prev, ["user-online", m]]);
    const userOffline = (m) => setSocketMessages((prev) => [...prev, ["user-offline", m]]);
    const onOnlineMembers = (m) => setSocketMessages((prev) => [...prev, ["online-members", m]]);
    const refreshGroup = () => setSocketMessages((prev) => [...prev, ["refresh-group", undefined]]);
    const refreshProfile = () => setSocketMessages((prev) => [...prev, ["refresh-profile", undefined]]);

    socket.current.on("connect", onConnect);
    // socket.current.on("disconnect", onDisconnect);
    socket.current.on("user-online", userOnline);
    socket.current.on("user-offline", userOffline);
    socket.current.on("online-members", onOnlineMembers);
    socket.current.on("refresh-group", refreshGroup);
    socket.current.on("refresh-profile", refreshProfile);

    return () => {
      clearInterval(i);
      socket.current.off("connect", onConnect);
      // socket.current.off("disconnect", onDisconnect);
      socket.current.off("user-online", userOnline);
      socket.current.off("user-offline", userOffline);
      socket.current.off("online-members", onOnlineMembers);
      socket.current.off("refresh-group", refreshGroup);
      socket.current.off("refresh-profile", refreshProfile);
      socket.current.disconnect();
    };
  }, []);
  useEffect(() => {
    const message = socketMessages[0];
    if (!message) return;
    setSocketMessages((prev) => [...prev].slice(1));
    if (message[0] == "user-online") {
      setOnlineMembers((prev) => {
        if (prev.includes(message[1])) return prev;
        return [...prev, message[1]];
      });
    }
    if (message[0] == "user-offline") {
      setOnlineMembers((prev) => {
        return prev.filter((id) => id !== message[1]);
      });
    }
    if (message[0] == "online-members") {
      setOnlineMembers(message[1]);
    }
    if (message[0] == "refresh-group") {
      if (currentGroupId) providerValue.loadGroup(currentGroupId);
    }
    if (message[0] == "refresh-profile") {
      getProfileFunction();
    }
  }, [socketMessages]);

  useEffect(() => {
    if (groupId && groupId != currentGroupId) {
      if (groupId == "default") {
        if (myGroups.length > 0) navigate(`/dashboard/groups/${myGroups[0].id}`);
      } else {
        providerValue.loadGroup(groupId);
      }
    }
  }, [groupId, myGroups]);

  // Get profile
  const getProfileFunction = async () => {
    const usersApi = new Api.UsersApi(configuration);
    const user = await usersApi.usersGet({ accessToken });
    setProfile(user.profile);
    setMyGroups(user.groups);
  };
  // Get group
  providerValue.loadGroup = async (groupId: string) => {
    setCurrentGroupId(groupId);
    const groupApi = new Api.GroupApi(configuration);
    const group = await groupApi.groupsGroupIdGet({ accessToken, groupId });
    setCurrentGroup(group);
    // Check if user is owner
    const owner = group.members.find((m) => m.user.id == profile?.id)?.owner || false;
    setOwnerOfCurrentGroup(owner);
    // Say room is joined over socket
    socket.current.emit("switchGroup", {
      token: accessToken,
      message: groupId
    });
  };
  // On mount
  useEffect(() => {
    getProfileFunction();
  }, []);
  //   const [emailOfCurrentUser, setEmailOfCurrentUser] = useState<string | null>(null);

  // Funtions
  providerValue.updateProfileFunction = async (options: {
    name?: string;
    avatar?: string;
    InitSetup?: boolean;
    verificationCode?: string;
    phoneNumber?: string;
    phoneNumberVerificationCode?: string;
  }) => {
    const { name, avatar, phoneNumber, phoneNumberVerificationCode } = options;
    const isInitSetup = options.InitSetup || false;
    const usersApi = new Api.UsersApi(configuration);
    const code = Number(options.verificationCode) || undefined;
    const response = await usersApi.usersPatch({
      accessToken,
      usersPatchRequest: { name, avatar: avatar, isInitSetup, verificationCode: code, phoneNumber, phoneNumberVerificationCode }
    });
    setProfile(response.profile);
    if (response.groups) setMyGroups(response.groups);
  };
  providerValue.createGroupFunction = async (name: string) => {
    const groupsPostRequest: Api.GroupsPostRequest = { name };
    const groupApi = new Api.GroupApi(configuration);
    let group: Api.Group;
    try {
      group = await groupApi.groupsPost({ accessToken, groupsPostRequest });
    } catch (e) {
      if (e instanceof Api.ResponseError) {
        if (e.response.status == 403) return setAlertMessage("Je mag maximaal 5 groepen aanmaken.");
        else return console.error(e);
      }
      return console.error(e);
    }

    setCurrentGroup(group);
    setCurrentGroupId(group.id);
    await getProfileFunction(); // Refresh profile so new group is added to menu
  };
  providerValue.updateGroupFunction = async (name: string) => {
    if (!currentGroup || !currentGroupId) return;
    const groupsPostRequest: Api.GroupsPostRequest = { name };
    const groupApi = new Api.GroupApi(configuration);
    await groupApi.groupsGroupIdPatch({
      accessToken,
      groupId: currentGroupId,
      groupsPostRequest
    });
    // No refresh needed because socket sends update request
  };
  providerValue.deleteGroupFunction = async () => {
    if (!currentGroup || !currentGroupId) return;
    const api = new Api.GroupApi(configuration);
    await api.groupsGroupIdDelete({ accessToken, groupId: currentGroupId });
    setCurrentGroupId(undefined);
    setCurrentGroup(undefined);
    await getProfileFunction(); // Refresh profile so group is removed from menu
  };
  providerValue.createDrinkFunction = async (name: string, icon: string, extras: string) => {
    if (!currentGroup || !currentGroupId) return;
    const groupsGroupIdDrinksPostRequest: Api.GroupsGroupIdDrinksPostRequest = {
      name,
      icon,
      extras
    };
    const api = new Api.GroupDrinksApi(configuration);
    await api.groupsGroupIdDrinksPost({
      accessToken,
      groupId: currentGroupId,
      groupsGroupIdDrinksPostRequest
    });
    // No refresh needed because socket sends update request
    providerValue.loadGroup(currentGroupId);
  };
  providerValue.updateDrinkFunction = async (drinkId: string, name: string, icon: string, extras: string) => {
    if (!currentGroup || !currentGroupId) return;
    const groupsGroupIdDrinksPostRequest: Api.GroupsGroupIdDrinksPostRequest = {
      name,
      icon,
      extras
    };
    const api = new Api.GroupDrinksApi(configuration);
    await api.groupsGroupIdDrinksDrinkIdPatch({
      accessToken,
      groupId: currentGroupId,
      drinkId,
      groupsGroupIdDrinksPostRequest
    });
    // No refresh needed because socket sends update request
    providerValue.loadGroup(currentGroupId);
  };
  providerValue.deleteDrinkFunction = async (drinkId: string) => {
    if (!currentGroup || !currentGroupId) return;
    const api = new Api.GroupDrinksApi(configuration);
    const response = await api.groupsGroupIdDrinksDrinkIdDeleteRaw({
      accessToken,
      groupId: currentGroupId,
      drinkId
    });
    if (response.raw.status == 204) providerValue.loadGroup(currentGroupId);
    if (response.raw.status == 200) {
      const body = await response.raw.json();
      if (Object.prototype.hasOwnProperty.call(body, "alert")) {
        setAlertMessage(body.alert);
      }
    }
  };
  providerValue.placeOrderFunction = async (drink: string, text?: string, extras?: string) => {
    if (!currentGroup || !currentGroupId || !currentGroup.activeDrawing?.id) return;
    const groupsGroupIdDrawingsDrawingIdPostRequest: Api.GroupsGroupIdDrawingsDrawingIdPostRequest = { drink, text, extras };
    const api = new Api.GroupDrawingsApi(configuration);
    await api.groupsGroupIdDrawingsDrawingIdPost({
      accessToken,
      groupId: currentGroupId,
      drawingId: currentGroup.activeDrawing.id,
      groupsGroupIdDrawingsDrawingIdPostRequest
    });
    providerValue.loadGroup(currentGroupId);
    // No refresh needed because socket sends update request
  };
  providerValue.addMemberFunction = async (email: string, invite: boolean) => {
    if (!currentGroup || !currentGroupId) return;
    const groupsGroupIdMembersPostRequest: Api.GroupsGroupIdMembersPostRequest = { email, invite };
    const api = new Api.GroupMemberApi(configuration);
    const response = await api.groupsGroupIdMembersPost({
      accessToken,
      groupId: currentGroupId,
      groupsGroupIdMembersPostRequest
    });
    providerValue.loadGroup(currentGroupId);
    if (response.message == "MAX_MEMBERS") setAlertMessage("Maximaal 20 leden per groep zijn toegestaan.");
    return response.message;
    // No refresh needed because socket sends update request
  };
  providerValue.changeMemberOwner = async (userId: string, isOwner: boolean) => {
    if (!currentGroup || !currentGroupId) return;
    const groupsGroupIdMembersUserIdPatchRequest: Api.GroupsGroupIdMembersUserIdPatchRequest = { isOwner };
    const api = new Api.GroupMemberApi(configuration);
    await api.groupsGroupIdMembersUserIdPatch({
      accessToken,
      groupId: currentGroupId,
      userId,
      groupsGroupIdMembersUserIdPatchRequest
    });
    providerValue.loadGroup(currentGroupId);
    // No refresh needed because socket sends update request
  };
  providerValue.removeMemberFunction = async (userId: string, isInvite: boolean) => {
    if (!currentGroup || !currentGroupId) return;
    const api = new Api.GroupMemberApi(configuration);
    const groupsGroupIdMembersUserIdDeleteRequest: Api.GroupsGroupIdMembersUserIdDeleteRequest = { isInvite };
    await api.groupsGroupIdMembersUserIdDelete({
      accessToken,
      groupId: currentGroupId,
      userId,
      groupsGroupIdMembersUserIdDeleteRequest
    });
    providerValue.loadGroup(currentGroupId);
    // No refresh needed because socket sends update request
  };
  providerValue.toggleNotificationFunction = async (groupId: string, method: string, value: boolean) => {
    if (!currentGroup || !currentGroupId) return;
    const groupNotificationApi = new Api.GroupNotificationApi(configuration);
    await groupNotificationApi.groupsGroupIdNotificationsPost({
      accessToken,
      groupId,
      groupsGroupIdNotificationsPostRequest: { method, value }
    });
    await getProfileFunction();
  };
  providerValue.startDrawing = async (seconds: number, self: boolean) => {
    if (!currentGroup || !currentGroupId) return;
    const api = new Api.GroupDrawingsApi(configuration);
    const groupsGroupIdDrawingsPostRequest: Api.GroupsGroupIdDrawingsPostRequest = { seconds, self };
    await api.groupsGroupIdDrawingsPost({
      accessToken,
      groupId: currentGroupId,
      groupsGroupIdDrawingsPostRequest
    });
    providerValue.loadGroup(currentGroupId);
  };

  providerValue.acknowledgeAlert = () => setAlertMessage(undefined);
  //TODO: Herschijven
  return <MainContext.Provider value={providerValue}>{props.children}</MainContext.Provider>;
};

export default Main;
