import {Card, HStack, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'

function CompanyInfoCard({ one, two }) {
  return (
    <>
      <Card maxW={'4xl'} borderRadius={'md'}>
        <Stack direction={'row'} align="center" p={3}>
            <HStack w={'285px'} ml={10}>
                <Text fontWeight={'bold'}>{one}</Text>
            </HStack>
            <VStack w={'md'} alignItems="flex-start" spacing={'-1'}>
                <Text>{two}</Text>
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
}

export default CompanyInfoCard