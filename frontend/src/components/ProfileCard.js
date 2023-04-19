import { Avatar, HStack, Tag, Text, VStack, IconButton, Stack, Card } from '@chakra-ui/react';
import { RiEditFill, RiProfileFill } from 'react-icons/ri';
import { FaBell } from 'react-icons/fa';

const ProfileCard = ({ name }) => {
  return (
    <Card maxW={'5xl'} borderRadius={'md'}>
        <Stack direction={'row'} align="center" p={3}>
            <HStack w={'lg'} spacing="10" ml={10}>
                <Avatar size="md" name="John Doe" src='https://bit.ly/sage-adebayo' />
                <Text fontWeight={'bold'}>{name}</Text>
            </HStack>
            <VStack w={'sm'} alignItems="flex-start" spacing={'-1'}>
                <Text>Singapore, Singapore</Text>
                <Text>14:38 GMT+8</Text>
            </VStack>
            <HStack w={'250px'}>
                <Tag  size={'sm'} variant='solid' colorScheme='green'>LICENSED</Tag>
            </HStack>
            <HStack >
                <IconButton
                    variant={'ghost'}
                    aria-label="open menu"
                    icon={<FaBell />}
                />
                <IconButton
                    variant={'ghost'}
                    aria-label="open menu"
                    icon={<RiProfileFill />}
                />
                <IconButton
                    variant={'ghost'}
                    aria-label="open menu"
                    icon={<RiEditFill />}
                />
            </HStack>
        </Stack>
    </Card>
  );
};

export default ProfileCard;