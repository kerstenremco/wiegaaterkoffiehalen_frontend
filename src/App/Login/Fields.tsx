import React from "react";
import { Input } from "@nextui-org/react";

type EmailProps = {
  setEmail: (email: string) => void;
  handleSubmit: () => void;
  value: string;
  isInvite?: boolean;
};
const Email: React.FC<EmailProps> = (props) => {
  return (
    <Input
      type="email"
      label="E-mailadres"
      onChange={(e) => props.setEmail(e.target.value)}
      onKeyDown={(e) => e.key == "Enter" && props.handleSubmit()}
      value={props.value}
      isDisabled={props.isInvite}
    />
  );
};

type PasswordProps = {
  label: string;
  setPassword: (email: string) => void;
  handleSubmit: () => void;
  value: string;
};
const Password: React.FC<PasswordProps> = (props) => {
  return (
    <Input
      type="password"
      label={props.label}
      onChange={(e) => props.setPassword(e.target.value)}
      onKeyDown={(e) => e.key == "Enter" && props.handleSubmit()}
      value={props.value}
    />
  );
};
type VerificationCodeProps = {
  setVerificationCode: (email: string) => void;
  handleSubmit: () => void;
  value: string;
};
const VerificationCode: React.FC<VerificationCodeProps> = (props) => {
  return (
    <Input
      label="Verificatiecode"
      onChange={(e) => props.setVerificationCode(e.target.value)}
      onKeyDown={(e) => e.key == "Enter" && props.handleSubmit()}
      value={props.value}
    />
  );
};

export { Email, Password, VerificationCode };
