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
import { AddIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

import Workspace from './Workspace';
import { getWorkspaceList, postCreateWorkspace } from '../../apis/api/workspace';
import ChannelList from '../Channel/ChannelList';
import { QUERY_KEYS } from '../../apis/queryKeys';

import { useQueryClient } from '@tanstack/react-query';

const WorkspaceList = () => {
  const queryClient = useQueryClient();
  const workspaces = queryClient.getQueryData(QUERY_KEYS.WORKSPACES) || [];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  // Handle Modal
  const onHandleAddWorkspace = () => {
    if (newWorkspaceName.trim()) {
      const newWorkspace = {
        id: workspaces.length + 1,
        name: newWorkspaceName.trim(),
      };

      // TODO workspace 추가 API 호출
      postCreateWorkspace(newWorkspace).then((resp) => {
        queryClient.setQueryData(QUERY_KEYS.WORKSPACES, {
          ...workspaces,
          data: [...(workspaces?.data || []), resp.data],
        });

        onClose();
      });
    }
  };

  return (
    <HStack align="stretch" spacing={0} h="100vh" bg="#19171D">
      <VStack py={3} px={3} spacing={3} align="center">
        {workspaces?.data?.map((workspace) => (
          <Workspace key={workspace.id} id={workspace.id} name={workspace.workspaceName} />
        ))}

        <Circle size="36px" bg="#313138" color="white" cursor="pointer" _hover={{ bg: '#4A154B' }} onClick={onOpen}>
          <Tooltip label="스페이스 추가" hasArrow bg="gray.700" color="white" placement="right">
            <AddIcon boxSize={4} />
          </Tooltip>
        </Circle>

        {/* Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent userSelect="none">
            <ModalHeader>
              <Text fontSize="xs" color="gray.500" mb={1}>
                workspace의
              </Text>
              <Text>스페이스 추가</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="xs" color="gray.500" mb={1} pl={1}>
                스페이스 이름
              </Text>
              <Input
                placeholder="# 새로운 스페이스"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={onHandleAddWorkspace}
                isDisabled={!newWorkspaceName.trim()}
                cursor={!newWorkspaceName.trim() ? 'not-allowed' : 'pointer'}
              >
                추가
              </Button>
              <Button variant="ghost" onClick={onClose}>
                취소
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </HStack>
  );
};

export default WorkspaceList;
