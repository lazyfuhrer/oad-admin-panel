import { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '@/context/UserContext';
import { Button, Box, Grid, Text, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ViewUsers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { role } = useContext(UserContext);
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get('/api/getuser');
        setUsers(response.data.allUsers);
      } catch (error) {
        console.error(error);
      }
    }
    getUserData();
  }, []);

  const handleDeleteUser = async (username) => {
    try {
      const res = await axios.delete(`/api/deleteuser?username=${username}`);
      console.log(res);
      toast({
        title: 'User Deleted',
        description: `User ${selectedUser.username} has been successfully deleted.`,
        status: 'success',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteConfirmation = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleConfirmDelete = () => {
    handleDeleteUser(selectedUser.username);
    setSelectedUser(null);
    onClose();
  };

  const renderUserCards = () => {
    return users
      .filter((user) => user.role !== 'admin')
      .map((user) => (
        <Box
          key={user.username}
          mb="4"
          p="3"
          borderWidth="1px"
          borderRadius="md"
          borderColor="gray.200"
          boxShadow="md"
          transition="0.3s"
          _hover={{ cursor: 'pointer', transform: 'scale(1.05)' }}
          onClick={() => router.push(`/editusers?username=${user.username}`)}
        >
          <Grid gap="2">
            <Text fontWeight="bold">USERNAME: {user.username}</Text>
            <Text fontWeight="bold">NAME: {`${user.firstname} ${user.lastname}`}</Text>
            <Text fontWeight="bold">EMAIL: {user.email}</Text>
            <Text fontWeight="bold">ROLE: {user.role}</Text>
            <Text fontWeight="bold">REPORT TO: {user.report}</Text>
          </Grid>
          {role !== 'executive' && (
            <Grid mt="3" gap="2" direction="column">
              <Button
                colorScheme="green"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/editusers?username=${user.username}`);
                }}
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteConfirmation(user);
                }}
              >
                Delete
              </Button>
            </Grid>
          )}
        </Box>
      ));
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="10px">
      {renderUserCards()}
      {selectedUser && (
        <AlertDialog isOpen={isOpen} motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete User
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete the user: {selectedUser.username}?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleConfirmDelete} ml={3} isLoading={isDeleting} loadingText="Deleting" disabled={isDeleting}>
                  {isDeleting ? <Spinner size="sm" color="white" /> : 'Delete'}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Grid>
  );
}