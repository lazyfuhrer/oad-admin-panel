import {Card, HStack, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'

function CompanyInfoCard({ field, value }) {
  return (
    <>
      <Card maxW={'1000px'} borderRadius={'sm'} mb={'2'} >
        <Stack direction={'row'} align="center" p={3}>
            <HStack w={'350px'} ml={10}>
                <Text fontWeight={'bold'}>{field}</Text>
            </HStack>
            <VStack w={'950px'} alignItems="flex-start" spacing={'-1'}>
                <Text>{value}</Text>
            </VStack>
            <HStack >
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