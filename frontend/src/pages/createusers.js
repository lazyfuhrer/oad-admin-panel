import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, useColorModeValue, Select } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { UserContext } from '@/context/UserContext';
  
export default function CreateUsers() {
    const { role } = useContext(UserContext);
    const [user, setUser] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showCpassword, setshowCpassword] = useState(false);
    const [formData, setFormData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      cpassword: '',
      role: 'customerAdmin',
      status : 'active',
      report: 'admin',
    });
  
    const handleInputChange = (event) => {
      const { id, value } = event.target;
      setFormData((formData) => ({ ...formData, [id]: value }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
       });
  
      if (res.ok) console.log(formData);
      //console.log(formData);
    };

    useEffect(() => {
      async function getUserData() {
        const response = await axios.get('/api/getuser');
        setUser(response.data.allUsers);
        console.log(response.data.allUsers);
      }
      getUserData();
    }, []);
  
    useEffect(() => {
      if (formData.role === "executive" && user.length > 0) {
        const firstManager = user.find((u) => u.role === "manager");
        setFormData((prevState) => ({
          ...prevState,
          reportTo: `${firstManager.firstname} ${firstManager.lastname}`
        }));
      }
    }, [formData.role, user]);
    
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Create user
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
                    <Input type="text" onChange={handleInputChange} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastname">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" onChange={handleInputChange} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={handleInputChange} />
              </FormControl>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="username" onChange={handleInputChange} />
              </FormControl>
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
                  <option value="customerAdmin">Customer - Admin</option>
                  <option value="customerOfficer">Customer - Officer</option>
                  <option value="customerFinance">Customer - Finance</option>
                  {role === "admin" && (
                    <>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="executive">Executive</option>
                    </>
                  )}
                </Select>
              </FormControl>
              {formData.role === "executive" ? (
                <FormControl id="report" isRequired>
                  <FormLabel>Assign to Manager</FormLabel>
                  <Select value={formData.reportTo} onChange={handleInputChange}>
                    {user.filter((u) => u.role === "manager").map((u, index) => (
                      <option key={index} value={`${u.firstname} ${u.lastname}`}>{`${u.firstname} ${u.lastname}`}</option>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
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
                  Create User
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }