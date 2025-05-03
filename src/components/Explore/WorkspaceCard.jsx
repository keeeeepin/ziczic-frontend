import React from 'react';

import {
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';
import { formatDate } from '../../utils/dateUtils';

import { useDisclosure } from '@chakra-ui/react';

import { joinWorkspace } from '../../apis/api/workspace';

const WorkspaceCard = ({ id, workspaceName, createdAt }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onJoinWorkspace = () => {
    console.log('onJoinWorkspace,,');

    joinWorkspace(id)
      .then((resp) => {
        console.log('가입완료');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        bg="white"
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg', transition: 'all 0.3s ease' }}
        transition="all 0.3s ease"
      >
        <Box p={3}>
          <Flex justify="space-between" algin="center" mb={2}>
            <Heading size="md" isTruncated>
              {workspaceName}
            </Heading>
            <Badge colorScheme="teal" borderRadius="full" px="2">
              #{id}
            </Badge>
          </Flex>

          <Flex justify="space-between" mt="5">
            <Text color="gray.500" fontSize="xs">
              {formatDate(createdAt)}
            </Text>
            <Button onClick={onOpen} size="xs">
              참가
            </Button>
          </Flex>
        </Box>
      </Box>

      {/* Modal */}
      <Modal isCentered blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{workspaceName}에 참가할까요?</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button size="sm" mr="2" onClick={() => onJoinWorkspace()}>
              참가
            </Button>
            <Button size="sm" colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkspaceCard;
