import CompanyInfoCard from '@/components/CompanyInfoCard'
import { Stack } from '@chakra-ui/react'
import React from 'react'

function CompanyInfo() {
  return (
    <>
      <Stack spacing={'2'} mb={'1'}>
        <CompanyInfoCard one={"UEN"} two={""}/>
        <CompanyInfoCard one={"COMAPNY NAME"} two={"SUPERSTAR UNITED INC."} />
        <CompanyInfoCard one={"INCORPORATION DATE"} two={"10/01/2022"} />
        <CompanyInfoCard one={"COMPANY TYPE"} two={""} />
        <CompanyInfoCard one={"PRINCIPAL ACTIVITY 1"} two={""} />
        <CompanyInfoCard one={"PRINCIPAL ACTIVITY 2"} two={""} />
        <CompanyInfoCard one={"REGISTERED OFFICE ADDRESS"} two={"7030 ANG MO KKO AVENUE 5 #08-94 NORTHSTAR @AMK SINGAPORE 569880"} />
        <CompanyInfoCard one={"FINANCIAL YEAR END"} two={""} />
        <CompanyInfoCard one={"DATE OF LAST AGM"} two={""} />
        <CompanyInfoCard one={"WEBSITE"} two={""} />
      </Stack>
    </>
  )
}

export default CompanyInfo