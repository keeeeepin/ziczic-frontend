import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';

import { QUERY_KEYS } from '../../apis/queryKeys';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const WorkspaceSearchModal = ({ isOpen, onClose, modalType }) => {
  const queryClient = useQueryClient();
  const workspaces = queryClient.getQueryData(QUERY_KEYS.WORKSPACES) || [];
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const onHandleAddWorkspace = () => {
    if (newWorkspaceName.trim()) {
      const netWorkspace = {
        id: workspaces.length + 1,
        name: newWorkspaceName.trim(),
      };

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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent userSelect="none">
          <ModalHeader>
            <Text fontSize="xs" color="gray.500" mb={1}>
              workspace의
            </Text>
            <Text>스페이스 탐색</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="xs" color="gray.500" mb={1} pl={1}>
              스페이스 검색
            </Text>
            <Input
              placeholder="# 검색어 입력하세요"
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
              가입
            </Button>
            <Button variant="ghost" onClick={onClose}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkspaceSearchModal;
