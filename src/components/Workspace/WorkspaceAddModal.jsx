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

import { postCreateWorkspace } from '../../apis/api/workspace';

const WorkspaceAddModal = ({ isOpen, onClose, modalType }) => {
  const queryClient = useQueryClient();
  const workspaces = queryClient.getQueryData(QUERY_KEYS.WORKSPACES) || [];
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const onHandleAddWorkspace = () => {
    if (newWorkspaceName.trim()) {
      const newWorkspace = {
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
            <Text>스페이스 추가</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="xs" color="gray.500" mb={1} pl={1}>
              {modalType === 'add' ? '스페이스 이름' : '스페이스 검색'}
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
    </>
  );
};

export default WorkspaceAddModal;
