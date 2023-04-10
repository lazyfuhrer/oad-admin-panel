import { Avatar, Button, Card, HStack, IconButton, Stack, Tag, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function ViewUsers() {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const deleteUser = (user) => async () => {
    try {
      const res = await axios.delete(`/api/deleteuser?username=${user.username}`);
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    async function getUserData() {
      const response = await axios.get('/api/getuser');
      //console.log(response.data.allUsers)
      setUser(response.data.allUsers);
    }
    getUserData();
  }, []);

  return (
    user.filter(user => user.role !== "admin").map((user) => (
        <Card key={user.username} mb={'10'} p={'5'}>
          <Stack direction="row" alignItems="center">
            <Stack>
              <Text fontWeight="bold">USERNAME: {user.username}</Text>
              <Text fontWeight="bold">NAME: {`${user.firstname} ${user.lastname}`}</Text>
              <Text fontWeight="bold">EMAIL: {user.email}</Text>
            </Stack>
            <Button colorScheme='green' onClick={()=> router.push(`/editusers?username=${user.username}`)}>Edit</Button>
            <Button colorScheme='red' onClick={deleteUser(user)}>Delete</Button>
          </Stack>
        </Card>
    ))
  );  
};