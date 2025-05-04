import {
  HStack,
  VStack,
  Circle,
  Box,
  Divider,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Tooltip,
  Input,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

import Workspace from './Workspace';
import { getWorkspaceList, postCreateWorkspace } from '../../apis/api/workspace';
import ChannelList from '../Channel/ChannelList';
import { QUERY_KEYS } from '../../apis/queryKeys';

import { useQueryClient } from '@tanstack/react-query';

import WorkspaceAddModal from './WorkspaceAddModal';
import WorkspaceSearchModal from './WorkspaceSearchModal';
import { useNavigate } from 'react-router-dom';

const WorkspaceList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const workspaces = queryClient.getQueryData(QUERY_KEYS.WORKSPACES) || [];
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const [modalType, setModalType] = useState('add');

  const onHandleExplorePage = () => {
    console.log('go to explore');
    navigate('/ziczic/explore');
  };

  return (
    <HStack w="4rem" align="stretch" spacing={0} h="100vh" bg="#19171D" position="fixed">
      <VStack py={3} px={3} spacing={3} align="center">
        {workspaces?.data?.map((workspace) => (
          <Workspace key={workspace.id} id={workspace.id} name={workspace.workspaceName} />
        ))}

        <Circle size="36px" bg="#313138" color="white" cursor="pointer" _hover={{ bg: '#4A154B' }} onClick={onAddOpen}>
          <Tooltip label="스페이스 추가" hasArrow bg="gray.700" color="white" placement="right">
            <AddIcon boxSize={4} />
          </Tooltip>
        </Circle>

        <Circle
          size="36px"
          bg="#313138"
          color="white"
          cursor="pointer"
          _hover={{ bg: '#4A154B' }}
          onClick={onHandleExplorePage}
        >
          <Tooltip label="스페이스 탐색" hasArrow bg="gray.700" color="white" placement="right">
            <SearchIcon boxSize={4} />
          </Tooltip>
        </Circle>

        {/* Modal */}
        <WorkspaceAddModal isOpen={isAddOpen} onClose={onAddClose} />
        {/* <WorkspaceSearchModal isOpen={isSearchOpen} onClose={onSearchClose} /> */}
      </VStack>
    </HStack>
  );
};

export default WorkspaceList;
