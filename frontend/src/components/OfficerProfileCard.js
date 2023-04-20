import { Heading, Avatar, Box, Center, Text, Stack, useColorModeValue, CheckboxGroup, Checkbox } from '@chakra-ui/react';
  
export default function OfficerProfileCard() {
    return (
      <Center>
        <Box maxW={'320px'} w={'full'} bg={useColorModeValue('white', 'gray.900')} p={6} textAlign={'center'}>
          <Avatar src={'https://bit.ly/sage-adebayo'} size={'xl'} alt={'Avatar Alt'} pos={'relative'}/>
          <Text fontWeight={700} fontSize={'14px'} color={'gray.500'} mb={4}>
            Edit Avatar
          </Text>
          <Heading fontSize={'lg'} fontFamily={'body'}>
            JACK SUPERSTAR DENVERS
          </Heading>

          <Stack mt={3} direction={'column'} spacing={0}>
            <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} fontSize={'14px'} fontWeight={500} px={3}>Singapore, Singapore</Text>
            <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} fontSize={'14px'} fontWeight={500} px={3}>14:38</Text>
            <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} fontSize={'14px'} fontWeight={500} px={3}>GMT+8</Text>
          </Stack>
          
          <Stack mt={5} direction={'column'} spacing={1} align={'center'} justify={'center'}>
            <CheckboxGroup>
                <Checkbox value={'kycComplete'}>KYC COMPLETE</Checkbox>
                <Checkbox value={'licensedUser'}>LICENSED USER</Checkbox>
            </CheckboxGroup>
          </Stack>
        </Box>
      </Center>
    );
};