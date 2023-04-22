{showSubmenu && children === 'OFFICERS' && (
    <Box mx={5}>
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
            fontSize={'14px'}
            fontWeight={'bold'}
          >
            <Icon
              mr="4"
              fontSize="16"
              as={FiTrendingUp}
            />
            DIRECTORS
          </Flex>
          <Divider orientation='horizontal' borderWidth={'1px'} borderColor="gray.300"/>
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
            fontSize={'14px'}
            fontWeight={'bold'}
          >
            <Icon
              mr="4"
              fontSize="16"
              as={FiTrendingUp}
            />
            SHAREHOLDERS
          </Flex>
          <Divider orientation='horizontal' borderWidth={'1px'} borderColor="gray.300"/>
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
            fontSize={'14px'}
            fontWeight={'bold'}
          >
            <Icon
              mr="4"
              fontSize="16"
              as={FiTrendingUp}
            />
            COMPANY SECRETARY
          </Flex>
          <Divider orientation='horizontal' borderWidth={'1px'} borderColor="gray.300"/>
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
            fontSize={'14px'}
            fontWeight={'bold'}
          >
            <Icon
              mr="4"
              fontSize="16"
              as={FiTrendingUp}
            />
            AUDITORS
        </Flex>
    </Box>
)}