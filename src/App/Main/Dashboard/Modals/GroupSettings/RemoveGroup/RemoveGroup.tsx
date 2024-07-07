import { Switch, Button } from "@nextui-org/react";
import { useState } from "react";

type Props = {
  isRemoved: boolean;
  handleRemove: () => Promise<void>;
  groupName: string;
};

const RemoveGroupBlade: React.FC<Props> = (props) => {
  const [confirm, setConfirm] = useState(false);
  if (!props.isRemoved) {
    return (
      <div className="grid gap-6">
        <p>
          Als je deze groep verwijdert dan is de groep nog zichtbaar bij gebruikers totdat ze opnieuw hebben ingelogd. Eventuele lopende rondes worden
          nog afgemaakt.
        </p>
        <Switch data-cy="removeGroupSwitch" isSelected={confirm} onValueChange={setConfirm} color="danger">
          Ik weet zeker dat ik de groep <span className="font-semibold">{props.groupName}</span> wil verwijderen
        </Switch>
        <Button data-cy="removeGroupConfirm" color="danger" variant="bordered" isDisabled={!confirm} onClick={props.handleRemove}>
          Groep verwijderen
        </Button>
      </div>
    );
  } else {
    return (
      <>
        <p className="font-semibold">Groep verwijderen</p>
        <hr />
        <div className="grid gap-6">
          <p>Deze groep is verwijderd. De volgende keer als je inlogd zal de groep niet meer zichtbaar zijn</p>
        </div>
      </>
    );
  }
};

export default RemoveGroupBlade;
