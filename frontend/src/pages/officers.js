import CompanyInfoCard from '@/components/CompanyInfoCard'
import CompanyInfoCardSmall from '@/components/CompanyInfoCardSmall';
import OfficerProfileCard from '@/components/OfficerProfileCard';
//import ProfileCard from '@/components/ProfileCard';
import { Box, Flex, HStack, Stack } from '@chakra-ui/react';

export default function Officers() {
  //const officers = ['JILL HILL SMITH', 'JACK SUPERSTAR DENVERS', 'HADWICK BOTZMAN'];
  return (
    <>
      {/* {officers.map((officer, index) => (
        <ProfileCard key={index} name={officer} />
      ))} */}
      <HStack align={'flex-start'}>
        <Stack spacing={'2'} mb={'1'} maxWidth={'1000px'}>
          <Box>
            <CompanyInfoCard field={"NAME"} value={"JACK SUPERSTAR DENVERS"} />
            <CompanyInfoCard field={"ID"} value={"S8012345G"} />
            <CompanyInfoCard field={"NATIONALITY"} value={"SINGAPOREAN"} />
            <CompanyInfoCard field={"ADDRESS"} value={"7030 ANG MO KIO AVENUE 5 #08-94 NORTHSTAR @AMK SINGAPORE 569880"} />
            <CompanyInfoCard field={"DATE OF APPOINTMENT"} value={"25/04/2023"} />
            <Flex gap={'2'}>
              <CompanyInfoCardSmall field={'CONTACT NUMBER'} value={'+91 7061436295'} />
              <CompanyInfoCardSmall field={'ALTERNATE CONTACT NUMBER'} value={'+91 7007436595'} />
            </Flex>
            <Flex gap={'2'}>
              <CompanyInfoCardSmall field={'EMAIL ADDRESS'} value={'iambiswarghya@gmail.com'} />
              <CompanyInfoCardSmall field={'ALTERNATE EMAIL ADDRESS'} value={'iambiswarghya@gmail.com'} />
            </Flex>
            <CompanyInfoCard field={"LANGUAGES SPOKEN"} value={"ENGLISH, GERMAN, SPANISH"} />
          </Box>
        </Stack>
        
        <OfficerProfileCard/>
      </HStack>
    </>
  )
}
