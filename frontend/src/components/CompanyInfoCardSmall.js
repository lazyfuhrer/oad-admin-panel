import {Card, HStack, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'

export default function CompanyInfoCardSmall({ field, value }) {
  return (
    <>
      <Card maxW={'500px'} borderRadius={'sm'} mb={'2'} >
        <Stack direction={'row'} align="center" p={3}>
            <HStack w={'200px'} ml={10}>
                <Text fontWeight={'bold'}>{field}</Text>
            </HStack>
            <VStack w={'200px'} alignItems="flex-start" spacing={'-1'}>
                <Text>{value}</Text>
            </VStack>
            <HStack>
                <IconButton
                    variant={'ghost'}
                    aria-label="open menu"
                    icon={<AiFillEdit />}
                />
            </HStack>
        </Stack>
      </Card> 
    </>
  )
};