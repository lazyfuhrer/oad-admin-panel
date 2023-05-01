import CompanyInfoCard from '@/components/CompanyInfoCard'
import CompanyInfoCardSmall from '@/components/CompanyInfoCardSmall';
import OfficerProfile from '@/components/OfficerProfile';
import OfficerProfileCard from '@/components/OfficerProfileCard';
import ProfileCard from '@/components/ProfileCard';
import { Box, Flex, HStack, Stack } from '@chakra-ui/react';

export default function Directors() {
  const officers = ['JILL HILL SMITH', 'JACK SUPERSTAR DENVERS', 'HADWICK BOTZMAN'];
  return (
    <>
      {officers.map((officer, index) => (
        <ProfileCard key={index} name={officer}/>
      ))}
    </>
  )
}