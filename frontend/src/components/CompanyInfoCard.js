import {Card, HStack, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'

function CompanyInfoCard({ one, two }) {
  return (
    <>
      <Card maxW={'1000px'} borderRadius={'sm'} mb={'2'} >
        <Stack direction={'row'} align="center" p={3}>
            <HStack w={'385px'} ml={10}>
                <Text fontWeight={'bold'}>{one}</Text>
            </HStack>
            <VStack w={'385px'} alignItems="flex-start" spacing={'-1'}>
                <Text>{two}</Text>
            </VStack>
            <HStack w={'230px'} >
                <IconButton
                  w={'385px'} 
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