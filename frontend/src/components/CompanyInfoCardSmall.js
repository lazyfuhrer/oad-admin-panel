import {Card, HStack, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'

export default function CompanyInfoCardSmall() {
  return (
    <>
      <Card maxWidth={'500px'} borderRadius={'sm'} >
        <Stack direction={'row'} align="center" p={3}>
            <HStack w={'285px'} ml={10}>
                <Text fontWeight={'bold'}>NAME</Text>
            </HStack>
            <VStack w={'md'} alignItems="flex-start" spacing={'-1'}>
                <Text>JOHN DOE</Text>
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