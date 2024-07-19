import React from "react";
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@nextui-org/modal";
import { ErrorBoundary as EB } from "react-error-boundary";
// Components
import Button from "./layout/Button";

// ErrorBoundary Fallback function
// @ts-expect-error no types for error and resetErrorBoundary
const FallbackUserInterface = ({ error, resetErrorBoundary }) => {
  const reset = () => {
    // remove all Cognito items from localStorage
    Object.keys(localStorage)
      .filter((x) => x.startsWith("Cognito"))
      .forEach((x) => localStorage.removeItem(x));
    resetErrorBoundary();
  };
  // Sentry.captureException(error);
  console.error(error);
  return (
    <Modal isOpen={true} isDismissable={false} isKeyboardDismissDisabled={false} hideCloseButton={true}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Oh nee, dit gaat niet goed...</ModalHeader>
            <ModalBody>
              <p>Er is een fout opgetreden. We zijn automatisch op de hoogte gesteld.</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={reset}>Herstarten</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// ErrorBoundary
type Props = {
  children: React.ReactNode;
};

const ErrorBoundary: React.FC<Props> = (props: Props) => {
  return <EB fallbackRender={FallbackUserInterface}>{props.children}</EB>;
};

export default ErrorBoundary;
