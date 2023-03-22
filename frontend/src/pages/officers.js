import { Avatar, Box, Card, HStack, IconButton, Stack, Tag, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import CompanyInfoCard from '@/components/CompanyInfoCard'

function Officers() {
  return (
    <>
      <Box >
        <CompanyInfoCard one={"UEN"} two={"SUPERSTAR UNITED INC."} three={<AiFillEdit />}/>
        <CompanyInfoCard one={"UEN"} two={"SUPERSTAR UNITED INC."} three={<AiFillEdit />}/>
        <CompanyInfoCard one={"UEN"} two={"SUPERSTAR UNITED INC."} three={<AiFillEdit />}/>
      </Box>
    </>
  )
}

export default Officers