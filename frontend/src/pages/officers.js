import CompanyInfoCard from '@/components/CompanyInfoCard'
import CompanyInfoCardSmall from '@/components/CompanyInfoCardSmall';
import ProfileCard from '@/components/ProfileCard';
import { Box, Center, Flex, HStack, Stack } from '@chakra-ui/react';
import React from 'react'

export default function Officers() {
  const officers = ['JILL HILL SMITH', 'JACK SUPERSTAR DENVERS', 'HADWICK BOTZMAN'];
  return (
    <>
      {/* List of Officers
      {officers.map((officer, index) => (
        <ProfileCard key={index} name={officer} />
      ))} */}
      <Stack spacing={'2'} mb={'1'} maxWidth={'1000px'}>
        <Box >
          <CompanyInfoCard one={"NAME"} two={""} />
          <CompanyInfoCard one={"ID"} two={officers[0]} />
          <CompanyInfoCard one={"NATIONALITY"} two={officers[0]} />
          <CompanyInfoCard one={"ADDRESS"} two={""} />
          <CompanyInfoCard one={"DATE OF APPOINTMENT"} two={""} />
          <CompanyInfoCard one={"LANGUAGES SPOKEN"} two={""} />
          <HStack mb={'1'}>
            <CompanyInfoCardSmall />
            <CompanyInfoCardSmall />
          </HStack>
          <HStack>
            <CompanyInfoCardSmall />
            <CompanyInfoCardSmall />
          </HStack>
        </Box>
      </Stack>
    </>
  )
}