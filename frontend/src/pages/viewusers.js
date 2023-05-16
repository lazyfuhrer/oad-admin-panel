import { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '@/context/UserContext';
import { Button, Card, Stack, Text, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Spinner } from '@chakra-ui/react';
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

  return (
    <>
      {users
        .filter(user => user.role !== 'admin')
        .map(user => {
          return (
            <Card key={user.username} mb="1" p="5">
              <Stack direction="row" alignItems="center">
                <Stack>
                  <Text fontWeight="bold">USERNAME: {user.username}</Text>
                  <Text fontWeight="bold">NAME: {`${user.firstname} ${user.lastname}`}</Text>
                  <Text fontWeight="bold">EMAIL: {user.email}</Text>
                  <Text fontWeight="bold">ROLE: {user.role}</Text>
                  <Text fontWeight="bold">REPORT TO: {user.report}</Text>
                </Stack>
                <Stack>
                  {role !== 'executive' && (
                    <>
                      <Button
                        colorScheme="green"
                        onClick={() => router.push(`/editusers?username=${user.username}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteConfirmation(user)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Stack>
              </Stack>
            </Card>
          );
        })}
      {selectedUser && (
        <AlertDialog isOpen={isOpen} motionPreset='slideInBottom' leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
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
    </>
  );
};