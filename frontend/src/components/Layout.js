import React, { useRef } from "react"
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Heading,
  Stack,
  Button,
  Center,
  InputGroup,
  InputRightElement,
  Input,
  useFullscreen,
  Divider
} from "@chakra-ui/react"
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu, FiBell, FiChevronDown, FiSearch, FiMaximize, FiAlignRight, FiEdit, FiActivity, FiLogOut } from "react-icons/fi"
import { CgProfile} from "react-icons/cg"
import NextLink from 'next/link'
import { useRouter } from "next/router"

const LinkItems = [
    { name: "DASHBOARD", icon: FiHome, to: '/' },
    { name: "COMPANY INFORMATION", icon: FiTrendingUp, to: '/companyinfo' },
    { name: "OFFICERS", icon: FiCompass, to: '/officers' },
    { name: "SHARES", icon: FiStar, to: '/shares' },
    { name: "DOCUMENTS", icon: FiSettings, to: '/documents' },
    { name: "ACCOUNTING", icon: FiSettings, to: '/accounting' },
    { name: "BILLING", icon: FiSettings, to: '/billing' },
    { name: "PARTNERSHIPS", icon: FiSettings, to: '/partnerships' },
    { name: "CONTACT", icon: FiSettings, to: '/contact' }
]



export default function Layout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  //const { toggleFullscreen } = useFullscreen();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex  alignItems="center" mx="8" justifyContent="space-between">
        <VStack mt={'5'} mb={'7'} spacing="1">
          <HStack >
            <Text fontWeight='bold'>
                John Smith
            </Text>
            <FiSettings />
          </HStack>
          <Avatar src='https://bit.ly/sage-adebayo' size="lg" />
          <Text fontWeight='bold'>
              Superstar United Inc.
          </Text>
        </VStack>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Divider orientation='horizontal' borderWidth={'1px'} borderColor="gray.300"/>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon} to={link.to} bg={isActive(link.to) ? 'blue.500' : ''} color={isActive(link.to) ? 'white' : ''}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, to, children, ...rest }) => {
  return (
    <Link
      as={NextLink}
      href={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="2"
        mx="4"
        borderRadius="md"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "yellow.400",
          color: "white"
        }}
        {...rest}
        fontSize={'14px'}
        fontWeight={'bold'}
        
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white"
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
      <Divider orientation='horizontal' borderWidth={'1px'} borderColor="gray.300"/>
    </Link>
  )
}

const MobileNav = ({ onOpen, ...rest }) => {
    const firstField = useRef()
    const { isOpen, onClose } = useDisclosure()
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        top="0"
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <HStack spacing={{ base: "0", md: "1" }}>
          <InputGroup w={{base: 'xs', md: 'xl', lg: '2xl'}}>
            <Input  variant='filled' type='tel' placeholder='Seacrh Company, Officers, Documents and Knowledge Base' _placeholder={{ fontStyle: 'italic' }} />
            <InputRightElement
              pointerEvents='none'
              children={<FiSearch color='gray.300' />}
            />
          </InputGroup>
          <IconButton
            // onClick={toggleFullscreen}
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiMaximize />}
          />
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar
                    size={"sm"}
                    src={
                      ""
                    }
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">Sonia Taylor</Text>
                    <Text fontSize="xs" color="gray.600">
                      Web Designer
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem icon={<CgProfile/>}>My Profile</MenuItem>
                <MenuItem icon={<FiEdit/>}>Edit Profile</MenuItem>
                <MenuItem icon={<FiEdit/>}>Account Settings</MenuItem>
                <MenuItem icon={<FiSettings/>}>Support</MenuItem>
                <MenuItem icon={<FiActivity/>}>Activity</MenuItem>
                <MenuDivider />
                <MenuItem icon={<FiLogOut/>}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiAlignRight />}
          />
        </HStack>
      </Flex>
    )
  }