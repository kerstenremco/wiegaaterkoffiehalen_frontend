import { Button, Tooltip } from "@nextui-org/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { MainContext } from "../../../../../../Context/Main";
import { Invite as IInvite, Member as IMember } from "../../../../../../api-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faKey } from "@fortawesome/free-solid-svg-icons";
import NewMemberModal from "./NewMember";
import RemoveMemberModal from "./RemoveMember";

type Props = {
  members: IMember[];
  invites: IInvite[];
  currentUserId: string;
};
const Members: React.FC<Props> = (props) => {
  // Context
  const mainContext = useContext(MainContext);
  // States
  const [userToRemove, setUserToRemove] = useState<string | undefined>(undefined);
  const [inviteToRemove, setInviteToRemove] = useState<string | undefined>(undefined);
  const [nameOfToRemove, setNameOfToRemove] = useState<string | undefined>(undefined);
  // const validInput = useValidator([{ value: email, isEmail: true }]);
  const [addingNewMember, setAddingNewMember] = useState(false);
  const [addingNewMemberMustInvite, setAddingNewMemberMustInvite] = useState(false);

  // Effects
  useEffect(() => {
    if (!mainContext || !mainContext.currentGroup || (!userToRemove && !inviteToRemove)) return setNameOfToRemove(undefined);
    if (userToRemove) {
      const name = mainContext.currentGroup.members.find((m) => m.user.id == userToRemove)?.user.name;
      if (name) return setNameOfToRemove(name);
    }
    if (inviteToRemove) {
      const email = mainContext.currentGroup.invites.find((i) => i.id == inviteToRemove)?.email;
      if (email) return setNameOfToRemove(email);
    }
    return setNameOfToRemove(undefined);
  }, [userToRemove, inviteToRemove]);

  // Functions
  const handleAddUser = async (email: string, invite: boolean) => {
    const result = await mainContext?.addMemberFunction(email, invite);
    if (result == "NOT_MEMBER") {
      setAddingNewMemberMustInvite(true);
    } else {
      closeAddMemberModal();
    }
  };
  const handleRemoveUser = async () => {
    if (userToRemove) await mainContext?.removeMemberFunction(userToRemove, false);
    if (inviteToRemove) await mainContext?.removeMemberFunction(inviteToRemove, true);
    setUserToRemove(undefined);
    setInviteToRemove(undefined);
  };
  const closeAddMemberModal = () => {
    setAddingNewMember(false);
    setAddingNewMemberMustInvite(false);
  };

  return (
    <>
      {addingNewMember && <NewMemberModal onClose={closeAddMemberModal} onConfirm={handleAddUser} mustInvite={addingNewMemberMustInvite} />}
      {nameOfToRemove && (
        <RemoveMemberModal
          onClose={() => {
            setUserToRemove(undefined);
            setInviteToRemove(undefined);
          }}
          onConfirm={handleRemoveUser}
          name={nameOfToRemove}
        />
      )}
      <div className="flex flex-col gap-3 mt-3">
        {props.members
          .filter((m) => m.user.id != props.currentUserId)
          .map((member) => {
            const classNameForOwnerIcon = member.owner
              ? "cursor-pointer hover:scale-105"
              : "grayscale-[80%] hover:grayscale-0 cursor-pointer hover:scale-105";
            const textForOwnerTooltip = member.owner ? "Verwijder groepsbeheerrechten" : "Geef groepsbeheerrechten";
            return (
              <Fragment key={member.user.id}>
                <div className="flex gap-1 items-center">
                  <span className="flex-1">{member.user.name || member.user.email}</span>
                  <FontAwesomeIcon
                    className={classNameForOwnerIcon}
                    icon={faKey}
                    onClick={() => mainContext?.changeMemberOwner(member.user.id, !member.owner)}
                  />
                  <Tooltip content={textForOwnerTooltip}></Tooltip>
                  <Tooltip content="Verwijder gebruiker">
                    <FontAwesomeIcon
                      className="cursor-pointer hover:scale-105 text-danger-LIGHT hover:text-danger"
                      icon={faTrashCan}
                      onClick={() => setUserToRemove(member.user.id)}
                    />
                  </Tooltip>
                </div>
              </Fragment>
            );
          })}
        {props.invites.map((invite) => {
          return (
            <Fragment key={invite.id}>
              <div className="flex gap-1 items-center">
                <span className="flex-1">{invite.email}</span>
                <span className="text-danger-400">Nog niet geaccepteerd</span>
                <Tooltip content="Verwijder uitnodiging">
                  <FontAwesomeIcon
                    className="cursor-pointer hover:scale-105 text-danger-LIGHT hover:text-danger"
                    icon={faTrashCan}
                    onClick={() => setInviteToRemove(invite.id)}
                  />
                </Tooltip>
              </div>
            </Fragment>
          );
        })}
        <Button data-cy="membersAddButton" color="primary" fullWidth onClick={() => setAddingNewMember(true)} isDisabled={false}>
          Nieuw lid toevoegen
        </Button>
      </div>
    </>
  );
};

export default Members;
