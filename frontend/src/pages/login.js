import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter()
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormValues((prevValues) => ({ ...prevValues, [name]: newValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    const { username, password } = formValues;
    router.push('/');
    // send the formValues object to the server or do something with it
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="username"
                  name="username"
                  value={formValues.username}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox
                    name="rememberMe"
                    checked={formValues.rememberMe}
                    onChange={handleInputChange}>
                    Remember me
                  </Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Log in
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Don't have an account?{' '}
                  <Link as={NextLink} href="/register" color={'blue.400'}>
                    Register
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}