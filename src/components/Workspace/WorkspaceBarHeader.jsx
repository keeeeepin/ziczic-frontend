import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from '@chakra-ui/react';

import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';

const WorkspaceBarHeader = ({ workspaceName }) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            rightIcon={isOpen ? <CloseIcon boxSize={2} /> : <ChevronDownIcon boxSize={3} />}
            display="flex"
            justifyContent={'content-between'}
            alignItems="center"
            color="#F2F3F5"
            textAlign="left"
            pl={2}
            fontSize="md"
            bg="2B2D31"
            // transition="all 0.3s"
            boxShadow="base"
            // bg="transparent"
            _hover={{ bg: 'gray.500', color: 'white' }}
            _expanded={{ bg: 'gray.500', color: 'white' }}
            w="100%"
          >
            <Box ml={3} fontWeight="bold">
              {workspaceName}
            </Box>
          </MenuButton>
          <MenuList bg="black" color="gray.400" borderColor="gray.600" px="1">
            <MenuItem alignItems="center" cursor="pointer" _hover = {{ bg: 'gray.600'}} bg="black.400">서버 설정</MenuItem>
            <MenuItem alignItems="center" cursor="pointer" _hover = {{ bg: 'gray.600'}} bg="black.400">채널 만들기</MenuItem>
            <MenuItem alignItems="center" cursor="pointer" _hover = {{ bg: 'gray.600'}} bg="gblack.400">카테고리 만들기</MenuItem>
            <MenuItem alignItems="center" cursor="pointer" _hover = {{ bg: 'gray.600'}} bg="gblack.400">초대하기</MenuItem>
            <MenuItem alignItems="center" cursor="pointer" _hover = {{ bg: 'gray.600'}} bg="gblack.400" color="red.300">서버 나가기</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default WorkspaceBarHeader;
