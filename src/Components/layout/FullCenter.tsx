type Props = {
  children?: React.ReactNode;
};

const FullCenter: React.FC<Props> = (props) => {
  return <div className="flex flex-col h-full items-center justify-center">{props.children}</div>;
};

export default FullCenter;
