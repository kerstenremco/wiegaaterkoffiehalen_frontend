import { Avatar } from "@nextui-org/react";
const avatarUrl = import.meta.env.VITE_AVATAR_URL;
const filenames = [
  "software.png",
  "chef.png",
  "mother.png",
  "cashier.png",
  "artist.png",
  "dancer.png",
  "actress.png",
  "daughter.png",
  "model.png",
  "assistant.png",
  "delivery.png",
  "athlete.png",
  "grandmother.png",
  "girl.png",
  "farmer.png",
  "teacher.png",
  "son.png",
  "employee.png",
  "woman.png",
  "musician.png",
  "student.png",
  "doctor.png",
  "engineer.png",
  "journalist.png",
  "scientist.png",
  "school.png",
  "captain.png",
  "telemarketer.png",
  "researcher.png",
  "boy.png",
  "father.png",
  "businesswoman.png"
];
type Props = {
  current?: string;
  onClick: (filename: string) => void;
};
const Emojis: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {filenames.map((filename) => (
        <Avatar
          key={filename}
          src={`${avatarUrl}${filename}`}
          isBordered={filename == props.current}
          className="ring-primary-700"
          onClick={props.onClick.bind(null, filename)}
        />
      ))}
    </div>
  );
};

export default Emojis;
