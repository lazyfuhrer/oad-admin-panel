import { Avatar, HStack, Tag, Text, VStack, IconButton, Stack, Card } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

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
            <HStack w={'sm'}>
                <Tag  size={'sm'} variant='solid' colorScheme='green'>LICENSED</Tag>
            </HStack>
            <HStack >
                <IconButton
                    variant={'ghost'}
                    aria-label="open menu"
                    icon={<FaFacebook />}
                />
                <IconButton
                    variant={'ghost'}
                    aria-label="open menu"
                    icon={<FaTwitter />}
                />
                <IconButton
                    variant={'ghost'}
                    aria-label="open menu"
                    icon={<FaInstagram />}
                />
            </HStack>
        </Stack>
    </Card>
  );
};

export default ProfileCard;