import { Button } from "@nextui-org/react";

const NoGroup: React.FC<{ onCreateNewGroup: () => void }> = (props) => {
  return (
    <>
      <p className="text-center">Je bent nog geen lid van een groep. Maak een nieuwe groep aan of voeg jezelf toe aan een bestaande groep.</p>
      <Button data-cy="noGroupCreateGroupButton" color="primary" onClick={props.onCreateNewGroup}>
        Nieuwe groep aanmaken
      </Button>
    </>
  );
};

export default NoGroup;
