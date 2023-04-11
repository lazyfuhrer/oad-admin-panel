import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Select,
  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useRouter } from 'next/router';
  
  export default function EditUsers() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showCpassword, setshowCpassword] = useState(false);
    const [formData, setFormData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      cpassword: '',
      role: 'customer',
      status : 'active'
    });
  
    const handleInputChange = (event) => {
      const { id, value } = event.target;
      setFormData((formData) => ({ ...formData, [id]: value }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      // const { firstname, lastname, email, username, password } = formData;
      
      const res = await fetch('/api/editsingleuser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
       });
  
      const data = await res.json(); 
  
      if (res.ok) console.log(data.user);
    };
  
    useEffect(() => {
      async function getSingleUserData() {
        try {
          const { username  } = router.query;
          const response = await fetch(`/api/getsingleuser?username=${username}`);
          const data = await response.json();
          const user = data.singleUser;
          setFormData({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            password: '',
            cpassword: '',
            role: user.role,
            status: user.status
          });
          //console.log(user)
        } catch (error) {
          console.error(error);
        }
      }
      getSingleUserData();
    }, []);
    
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Edit user
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstname" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" onChange={handleInputChange} value={formData.firstname} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastname">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" onChange={handleInputChange} value={formData.lastname} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={handleInputChange} value={formData.email} />
              </FormControl>
              <Box>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={formData.username} isReadOnly />
              </Box>
              <FormControl id="status" isRequired>
                <FormLabel>Status</FormLabel>
                <Select value={formData.status} onChange={handleInputChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </FormControl>
              <FormControl id="role" isRequired>
                <FormLabel>Role</FormLabel>
                <Select value={formData.role} onChange={handleInputChange}>
                  <option value="customer">Customer</option>
                  <option value="manager">Manager</option>
                  <option value="executive">Executive</option>
                </Select>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleInputChange}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="cpassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showCpassword ? 'text' : 'password'}
                    onChange={handleInputChange}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setshowCpassword((showCpassword) => !showCpassword)
                      }>
                      {showCpassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSubmit}>
                  Update User
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }