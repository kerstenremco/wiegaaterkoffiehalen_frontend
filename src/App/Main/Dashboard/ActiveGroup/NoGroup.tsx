import { Button as B } from "@nextui-org/react";

const NoGroup: React.FC<{ onCreateNewGroup: () => void }> = (props) => {
  return (
    <>
      <p className="text-center">Je bent nog geen lid van een groep. Maak een nieuwe groep aan of voeg jezelf toe aan een bestaande groep.</p>
      <B data-cy="noGroupCreateGroupButton" color="primary" onClick={props.onCreateNewGroup}>
        Nieuwe groep aanmaken
      </B>
    </>
  );
};

export default NoGroup;
