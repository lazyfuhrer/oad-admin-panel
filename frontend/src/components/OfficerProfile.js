import { Box, Flex, Avatar, Text, Badge } from "@chakra-ui/react";
import { MdVerifiedUser, MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";

export default function OfficerProfile({ name, country, mobileNumber, email, address, avatarUrl, licensed }) {
  return (
    <Box bg="white" w="360px" borderRadius="lg" p={4} color={'black'}>
      <Flex justify="space-between" align="center" mb={4}>
        <Avatar size="lg" name={name} src={avatarUrl} />
        <Box textAlign="left">
          <Text fontSize="lg" fontWeight="bold">{name}</Text>
          <Text>{country}</Text>
          <Text>14:38 GMT+8</Text>
        </Box>
      </Flex>
      <Box mb={4}>
        {licensed ? (
          <Badge colorScheme="green" mb={2}>
            <Flex align="center">
              <MdVerifiedUser />
              <Text ml={2}>Licensed</Text>
            </Flex>
          </Badge>
        ) : (
          <Badge colorScheme="red" mb={2}>
            <Flex align="center">
              <FaExclamationTriangle />
              <Text ml={2}>Not licensed</Text>
            </Flex>
          </Badge>
        )}
      </Box>
      <Box>
        <Flex align="center">
          <Box as={MdPhone} mr={5} />
          <Text fontSize="sm" fontWeight="semibold">{mobileNumber}</Text>
        </Flex>
        <Flex align="center" mt={4}>
          <Box as={MdEmail} mr={5} />
          <Text fontSize="sm" fontWeight="semibold">{email}</Text>
        </Flex>
        <Flex align="center" mt={4}>
          <Box as={MdLocationOn} mr={5} />
          <Text fontSize="sm" fontWeight="semibold">{address}</Text>
        </Flex>
      </Box>
    </Box>
  );
};