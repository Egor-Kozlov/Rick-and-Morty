import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";

const SmthWentWrong = () => {
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent paddingBottom={6}>
          <AlertDialogHeader>Something went wrong :&#40;</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Sorry, but something went wrong. Please, try again later or refresh the page.</AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SmthWentWrong;
