import React, { useRef, useState } from "react"
import { IconButton, Avatar, Box, CloseButton, Flex, HStack, VStack, Icon, useColorModeValue, Link, Drawer, DrawerContent, Text, useDisclosure, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Button, Stack, DrawerOverlay, DrawerCloseButton, DrawerHeader, DrawerBody, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, DrawerFooter, Textarea, Select, Card, CardHeader, CardBody, StackDivider, TableContainer, Table, Thead, Tr, Th, Td, Tbody, Tfoot, TableCaption, Spacer, FormControl, Checkbox, useBreakpointValue, useBoolean, Collapse, Tag } from "@chakra-ui/react"
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu, FiBell, FiChevronDown, FiSearch, FiMaximize, FiAlignRight, FiEdit, FiActivity, FiLogOut, FiFilter } from "react-icons/fi"
import { CgProfile} from "react-icons/cg"
import { ChevronRightIcon } from "@chakra-ui/icons"

export default function Home() {
  const [show, setShow] = useBoolean(false);
  const isVertical = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center">
          <Box w={{ base: "100%", md: "50%" }}>
            <Heading as="h1" fontSize={'24px'} mb="4" color={'#334151'} fontWeight={'500'}>
              Dashboard
            </Heading>

            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
              fontWeight="medium"
              fontSize={{ base: "14px", md: "16px" }}
              mb="4"
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink color="blue.500">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>

          <Box>
            <HStack spacing="2">
              <Menu>
                <MenuButton as={Button} colorScheme="purple" leftIcon={<FiFilter />} rightIcon={<FiChevronDown />} size="md" w="auto">
                  Export
                </MenuButton>
                <MenuList>
                  <MenuItem>Export as PDF</MenuItem>
                  <MenuItem>Export as Image</MenuItem>
                  <MenuItem>Export as Excel</MenuItem>
                </MenuList>
              </Menu>
              <Button onClick={()=> { setShow.toggle()}} colorScheme="orange" leftIcon={<FiFilter />} rightIcon={<FiChevronDown />} size="md" w="auto">
                Filter
              </Button>
            </HStack>
          </Box>
        </Stack>
        <Collapse in={show} animateOpacity>
          <Card w={'full'} p={'5'} mb={'5'} >
            <Stack direction={isVertical ? "column" : "row"} spacing={4} align={isVertical ? "center" : "flex-start"}>
              <FormControl>
                <FormLabel>From :</FormLabel>
                <Input type="datetime-local" />
              </FormControl>

              <FormControl>
                <FormLabel>To :</FormLabel>
                <Input type="datetime-local" />
              </FormControl>

              <FormControl>
                <FormLabel>Sales By Country :</FormLabel>
                <Select placeholder='Select country'>
                  <option>India</option>
                  <option>China</option>
                  <option>United Arab Emirates</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Products :</FormLabel>
                <Select placeholder='Select here'>
                  <option>India</option>
                  <option>China</option>
                  <option>United Arab Emirates</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Sales Type :</FormLabel>
                <Select placeholder='Select here'>
                  <option>India</option>
                  <option>China</option>
                  <option>United Arab Emirates</option>
                </Select>
              </FormControl>
            </Stack>
            <Stack mt={'5'} direction="row" spacing={4} justify="flex-end">
              <Button colorScheme="purple">Apply</Button>
              <Button colorScheme="orange">Reset</Button>
            </Stack>
          </Card>  
    </Collapse>
    <Stack direction={{base: 'column', md: 'row'}} spacing='5'>
      <Card w='full'>
          <CardHeader>
            <Heading size='md'>Client Report</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Summary
                </Heading>
                <Text pt='2' fontSize='sm'>
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Overview
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>

        <Card w='full'>
          <CardHeader>
            <Heading size='md'>Client Report</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Summary
                </Heading>
                <Text pt='2' fontSize='sm'>
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Overview
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>

        <Card w='full'>
          <CardHeader>
            <Heading size='md'>Client Report</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Summary
                </Heading>
                <Text pt='2' fontSize='sm'>
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Overview
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
    </Stack>  
    <Stack mt={'5'} mb={'8'}>
    <Card p={'3'} pb={'5'}>
      <TableContainer fontSize={'14px'} mt="3">
        <Heading as="h1" fontSize="15px">
          Product Summary
        </Heading>
        <Text fontSize="13px"  mb="5">
          Nemo enim ipsam voluptatem fugit sequi nesciunt.
        </Text>
        <Table variant="simple">
      <Thead>
        <Tr>
          <Th border="1px solid" borderColor="gray.300">#NO</Th>
          <Th border="1px solid" borderColor="gray.300">CLIENT NAME</Th>
          <Th border="1px solid" borderColor="gray.300">PRODUCT ID</Th>
          <Th border="1px solid" borderColor="gray.300">PRODUCT</Th>
          <Th border="1px solid" borderColor="gray.300">PRODUCT COST</Th>
          <Th border="1px solid" borderColor="gray.300">PAYMENT MODE</Th>
          <Th border="1px solid" borderColor="gray.300">STATUS</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td border="1px solid" borderColor="gray.300">#01</Td>
          <Td border="1px solid" borderColor="gray.300">Product 1</Td>
          <Td border="1px solid" borderColor="gray.300">Category 1</Td>
          <Td border="1px solid" borderColor="gray.300">Lorem ipsum dolor sit amet</Td>
          <Td border="1px solid" borderColor="gray.300">$19.99</Td>
          <Td border="1px solid" borderColor="gray.300">Online Payment</Td>
          <Td border="1px solid" borderColor="gray.300"><Tag size={'sm'} variant='solid' colorScheme='purple'>Add Cart</Tag></Td>
        </Tr>
        <Tr>
          <Td border="1px solid" borderColor="gray.300">#02</Td>
          <Td border="1px solid" borderColor="gray.300">Product 2</Td>
          <Td border="1px solid" borderColor="gray.300">Category 2</Td>
          <Td border="1px solid" borderColor="gray.300">Consectetur adipiscing elit</Td>
          <Td border="1px solid" borderColor="gray.300">$29.99</Td>
          <Td border="1px solid" borderColor="gray.300">Cash on delivered</Td>
          <Td border="1px solid" borderColor="gray.300"><Tag size={'sm'} variant='solid' colorScheme='red'>Shipped</Tag></Td>
        </Tr>
        <Tr>
          <Td border="1px solid" borderColor="gray.300">#03</Td>
          <Td border="1px solid" borderColor="gray.300">Product 3</Td>
          <Td border="1px solid" borderColor="gray.300">Category 1</Td>
          <Td border="1px solid" borderColor="gray.300">Sed do eiusmod tempor incididunt ut labore</Td>
          <Td border="1px solid" borderColor="gray.300">$14.99</Td>
          <Td border="1px solid" borderColor="gray.300">Online Payment</Td>
          <Td border="1px solid" borderColor="gray.300"><Tag size={'sm'} variant='solid' colorScheme='orange'>Delivering</Tag></Td>
        </Tr>
        <Tr>
          <Td border="1px solid" borderColor="gray.300">#04</Td>
          <Td border="1px solid" borderColor="gray.300">Product 4</Td>
          <Td border="1px solid" borderColor="gray.300">Category 2</Td>
          <Td border="1px solid" borderColor="gray.300">Mauris consectetur nisl ut felis aliquam, at tincidunt odio fringilla</Td>
          <Td border="1px solid" borderColor="gray.300">$39.99</Td>
          <Td border="1px solid" borderColor="gray.300">Cash on delivered</Td>
          <Td border="1px solid" borderColor="gray.300"><Tag size={'sm'} variant='solid' colorScheme='blue'>Add to Cart</Tag></Td>
        </Tr>
        <Tr>
          <Td border="1px solid" borderColor="gray.300">#05</Td>
          <Td border="1px solid" borderColor="gray.300">Product 5</Td>
          <Td border="1px solid" borderColor="gray.300">Category 1</Td>
          <Td border="1px solid" borderColor="gray.300">Nullam eget ex luctus, dapibus augue non, bibendum quam</Td>
          <Td border="1px solid" borderColor="gray.300">$24.99</Td>
          <Td border="1px solid" borderColor="gray.300">Online Payment</Td>
          <Td border="1px solid" borderColor="gray.300"><Tag size={'sm'} variant='solid' colorScheme='teal'>Delevered</Tag></Td>
        </Tr>
      </Tbody>
    </Table>
      </TableContainer>
    </Card>
    </Stack>  
    </>
  )
}