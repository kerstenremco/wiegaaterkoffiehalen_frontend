import { DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, DropdownSection, Avatar } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { GroupMember } from "../../../../api-sdk";

type Props = { groups: GroupMember[]; onCreateNewGroup: () => void; onClickGroup: (groupId: string) => void; currentGroupName?: string };
const GroupMenu: React.FC<Props> = (props) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="bg-primary-200 flex items-center gap-2 p-2 cursor-pointer rounded-lg">
          <Avatar className="w-6 h-6 xl:h-10 xl:w-10" name={"groupContext.currentGroup.name"} />
          <span className="flex-1 hidden xl:block">{props.currentGroupName || "Selecteer groep"}</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </DropdownTrigger>

      {/* Use map because of TS issue https://github.com/nextui-org/nextui/issues/1691 */}
      <DropdownMenu aria-label="Dynamic Actions">
        <DropdownSection showDivider>
          {props.groups.map((group) => (
            <DropdownItem key={group.id} color="primary" startContent={<Avatar name={group.name} />} onClick={() => props.onClickGroup(group.id)}>
              {group.name}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection>
          {/* <DropdownItem key="addGroup" startContent={<Avatar name="+" />} className="text-success-400" onClick={props.onAddGroup}>
            Nieuwe groep aanmaken
          </DropdownItem> */}
          <DropdownItem
            onClick={props.onCreateNewGroup}
            key="newGroup"
            color="primary"
            description="Maak een nieuwe groep aan"
            className="group"
            startContent={<FontAwesomeIcon className="text-secondary-800 group-hover:text-secondary-100" icon={faCirclePlus} size="3x" />}>
            Nieuw
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default GroupMenu;
