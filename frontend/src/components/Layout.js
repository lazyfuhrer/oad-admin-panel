import React, { useContext, useEffect, useRef, useState } from "react"
import { IconButton, Avatar, Box, CloseButton, Flex, HStack, VStack, Icon, useColorModeValue, Link, Drawer, DrawerContent, Text, useDisclosure, Menu, MenuButton, MenuDivider, MenuItem, MenuList, InputGroup, InputRightElement, Input, Divider, useColorMode } from "@chakra-ui/react"
import { FiHome, FiTrendingUp, FiSettings, FiMenu, FiBell, FiChevronDown, FiSearch, FiMaximize, FiAlignRight, FiEdit, FiActivity, FiLogOut } from "react-icons/fi"
import { CgProfile} from "react-icons/cg"
import NextLink from 'next/link'
import { useRouter } from "next/router"
import { UserContext } from "@/context/UserContext"
import { FaMoon, FaSun } from "react-icons/fa"
import { teamworkCompanyGet } from "../../utils/TeamworkCompanies"
import Select from 'react-select';

const LinkItems = [
  { name: "DASHBOARD", icon: FiHome, to: '/' },
  { name: "REPORT", icon: FiHome, to: '/report' },
  { name: "COMPANY INFORMATION", icon: FiTrendingUp, to: '/companyinfo' },
  { name: "CREATE USERS", icon: FiTrendingUp, to: '/createusers' },
  { name: "VIEW USERS", icon: FiTrendingUp, to: '/viewusers' },
  { name: "OFFICERS", icon: FiSettings, to: '/officers' },
  { name: "SHARES", icon: FiSettings, to: '/shares' },
  { name: "DOCUMENTS", icon: FiSettings, to: '/documents' },
  { name: "ACCOUNTING", icon: FiSettings, to: '/accounting' },
  { name: "BILLING", icon: FiSettings, to: '/billing' },
  { name: "PARTNERSHIPS", icon: FiSettings, to: '/partnerships' },
  { name: "CONTACT", icon: FiSettings, to: '/contact' },
]

export default function Layout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      <Box ml={{ base: 0, md: 60 }} p="4" bg={'#D3D3D3'}>
        {children}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await teamworkCompanyGet();
      setData(response);
      if (selectedValue === null && response.length > 0) {
        setSelectedValue(response[0].entity_name);
      }
    };

    fetchData();
  }, []);

  const { firstname, lastname, role, selectedValue, setSelectedValue } = useContext(UserContext);
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;

  return (
    <Box transition="3s ease" bg={useColorModeValue("white", "gray.900")} borderRight="1px" borderRightColor={useColorModeValue("gray.200", "gray.700")} w={{ base: "full", md: 60 }} pos="fixed" h="full"{...rest}>
      <Flex  alignItems="center" mx="8" justifyContent="space-between">
        <VStack mt={'5'} mb={'3'} spacing="1">
          <HStack >
            <Text fontWeight='bold'>
              {firstname} {lastname}
            </Text>
            <FiSettings />
          </HStack>
          <Avatar src='https://bit.ly/sage-adebayo' size="lg" />
          <Flex align="center" fontSize={'14px'} fontWeight={'bold'} direction="column">
            <Select
              options={data.map((company, index) => ({ value: index, label: company.entity_name }))}
              value={{ value: 0, label: selectedValue }}
              onChange={(selectedOption) => {
                const selectedValue = selectedOption.label;
                const selectedIndex = selectedOption.value;
                setSelectedValue(selectedValue);
                router.push({ query: { id: selectedIndex } });
              }}
              styles={{ control: (provided) => ({ ...provided, width: 180, borderRadius: 5 }) }}
            />
          </Flex>
        </VStack>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Divider orientation='horizontal' borderWidth={'1px'} borderColor="gray.300"/>
      {LinkItems.map(link => {
        if (link.name === 'CREATE USERS' && (role != 'admin' && role != 'manager' && role != 'executive' )) { 
          return null;
        }
        if (link.name === 'VIEW USERS' && role == 'customerAdmin') {
          return null;
        }
        if ((link.name === 'VIEW USERS' || link.name === 'BILLING' || link.name === 'ACCOUNTING') && role == 'customerOfficer') {
          return null;
        }
        if ((link.name === 'VIEW USERS' || link.name === 'BILLING' || link.name === 'OFFICERS' || link.name === 'SHARES' || link.name === 'DOCUMENTS' || link.name === 'PARTNERSHIPS' || link.name === 'CONTACT') && role == 'customerFinance') {
          return null;
        }
        if (link.name === 'REPORT' && (role == 'executive' || role == 'customerAdmin' || role == 'customerOfficer' || role == 'customerFinance')) {
          return null;
        }
        return ( <NavItem key={link.name} icon={link.icon} to={link.to} bg={isActive(link.to) ? 'rgb(128, 90, 213)' : ''} color={isActive(link.to) ? 'white' : ''}>{link.name}</NavItem> );
      })}
    </Box>
  )
}

const NavItem = ({ icon, to, children, subItems, ...rest }) => {
  const [showSubItems, setShowSubItems] = useState(false);

  const toggleSubItems = () => {
    setShowSubItems(!showSubItems);
  };

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
        mx="0"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "yellow.400",
          color: "white"
        }}
        onClick={() => {
          if (children === 'OFFICERS') {
            toggleSubItems();
          }
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
      {showSubItems && children === 'OFFICERS' && (
        <Box zIndex={'999'} mx={5}>
          <Link as={NextLink} href={'/officers/directors'} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Flex
                align="center"
                p="2"
                mx="0"
                role="group"
                cursor="pointer"
                _hover={{
                  bg: "yellow.400",
                  color: "white"
                }}
                _groupHover={{
                  color: "white"
                }}
                {...rest}
                fontSize={'12px'}
                fontWeight={'bold'}
              >
                <Icon
                  mr="4"
                  fontSize="14"
                  as={FiTrendingUp}
                />
                DIRECTORS
              </Flex>
            </Link>
          <Divider orientation='horizontal' borderWidth={'1px'} borderColor="gray.300"/>
          <Link as={NextLink} href={'/officers/shareholders'} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Flex
              align="center"
              p="2"
              mx="0"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "yellow.400",
                color: "white"
              }}
              _groupHover={{
                color: "white"
              }}
              {...rest}
              fontSize={'12px'}
              fontWeight={'bold'}
            >
              <Icon
                mr="4"
                fontSize="14"
                as={FiTrendingUp}
              />
              SHAREHOLDERS
            </Flex>
          </Link>
          <Divider orientation='horizontal' borderWidth={'1px'} borderColor="gray.300"/>
          <Link as={NextLink} href={'/officers/companysecretary'} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Flex
              align="center"
              p="2"
              mx="0"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "yellow.400",
                color: "white"
              }}
              _groupHover={{
                color: "white"
              }}
              {...rest}
              fontSize={'12px'}
              fontWeight={'bold'}
            >
              <Icon
                mr="4"
                fontSize="14"
                as={FiTrendingUp}
              />
              COMPANY SECRETARY
            </Flex>
          </Link>
          <Divider orientation='horizontal' borderWidth={'1px'} borderColor="gray.300"/>
          <Link as={NextLink} href={'/officers/auditors'} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Flex
              align="center"
              p="2"
              mx="0"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "yellow.400",
                color: "white"
              }}
              _groupHover={{
                color: "white"
              }}
              {...rest}
              fontSize={'12px'}
              fontWeight={'bold'}
            >
              <Icon
                mr="4"
                fontSize="14"
                as={FiTrendingUp}
              />
              AUDITORS
            </Flex>
          </Link>
        </Box>
      )}
    </Link>
  )
}

const MobileNav = ({ onOpen, ...rest }) => {
    const [colorMode, setColorMode] = useState('light');
    const { toggleColorMode } = useColorMode();
    const { firstname, lastname, role } = useContext(UserContext);
    const router = useRouter();
    const firstField = useRef()
    const { isOpen, onClose } = useDisclosure()
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={'#D3D3D3'}
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
            <Input bg={'#BDBDBD'} variant='filled' type='tel' placeholder='Seacrh Company, Officers, Documents and Knowledge Base' _placeholder={{ fontStyle: 'italic', fontWeight: '500' }} />
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
          <IconButton
          zIndex={'999'}
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={() => {
              setColorMode(colorMode === 'light' ? 'dark' : 'light');
              toggleColorMode();
            }}
            position="fixed"
            bottom={4}
            right={4}
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
                    <Text fontSize="sm">{firstname} {lastname}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {role}
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
                <MenuItem onClick={()=>{
                    localStorage.clear()
                    router.push('/login');
                  }} icon={<FiLogOut/>}>Sign out</MenuItem>
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