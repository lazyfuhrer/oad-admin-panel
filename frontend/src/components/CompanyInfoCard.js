import {Card, HStack, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

function CompanyInfoCard({ one, two, three }) {
  return (
    <>
      <Card maxW={'4xl'} borderRadius={'md'}>
        <Stack direction={'row'} align="center" p={3}>
            <HStack w={'200px'} ml={10}>
                <Text fontWeight={'bold'}>{one}</Text>
            </HStack>
            <VStack w={'xl'} alignItems="flex-start" spacing={'-1'}>
                <Text>{two}</Text>
            </VStack>
            <HStack >
                <IconButton
                    variant={'ghost'}
                    aria-label="open menu"
                    icon={three}
                />
            </HStack>
        </Stack>
      </Card> 
    </>
  )
}

export default CompanyInfoCard