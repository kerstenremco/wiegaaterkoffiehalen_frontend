import React, { MouseEventHandler } from "react";
import { Button as B, Spinner } from "@nextui-org/react";

type Props = {
  children?: React.ReactNode;
  onClick: MouseEventHandler;
  isLoading?: boolean;
  isDisabled?: boolean;
  bordered?: boolean;
  small?: boolean;
};

const Button: React.FC<Props> = (props) => {
  const className = props.small ? "" : "w-full";
  return (
    <B
      color="primary"
      variant={props.bordered ? "bordered" : "solid"}
      className={className}
      onClick={props.onClick}
      isDisabled={props.isLoading || props.isDisabled}>
      {props.isLoading && <Spinner size="sm" color="default" />}
      {props.children}
    </B>
  );
};

export default Button;
