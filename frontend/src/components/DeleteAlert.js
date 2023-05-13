import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';
import { useRef } from 'react'

export default function DeleteUserAlertDialog({ isOpen, onClose, deleteUser }) {
  const cancelRef = useRef();
  return (
    <AlertDialog motionPreset='slideInBottom' leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Delete User?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>No</Button>
          <Button onClick={deleteUser} colorScheme='red' ml={3}>Yes</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};