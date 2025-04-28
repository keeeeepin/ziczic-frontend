import {
  VStack,
  HStack,
  Box,
  Text,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  space,
} from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { getChannelList, postCreateChannel } from '../../apis/api/channel';

import Channel from '../Channel/Channel';

import WorkspaceBarHeader from './WorkspaceBarHeader';

const WorkspaceBar = ({ workspaceId }) => {
  const [channelList, setChannelList] = useState([
    // { id: 1, name: '일반' },
    // { id: 2, name: '공지사항' },
    // { id: 3, name: '프로젝트' },
    // { id: 4, name: '잡담' },
  ]);

  const [isChannelVisible, setIsChannelVisible] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newChannelName, setNewChannelName] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');

  const toggleChannelVisibility = () => {
    setIsChannelVisible(!isChannelVisible);
  };

  const onHandleAddChannel = () => {
    if (newChannelName.trim()) {
      const newChannel = {
        workspaceId: workspaceId,
        name: newChannelName.trim(),
      };

      console.log('-- new chnnel name --', newChannel.name);
      console.log('-- new chnnel name --', workspaceId);
      setChannelList([...channelList, newChannel]);
      setNewChannelName('');

      postCreateChannel(newChannel);

      onClose();
    }
  };

  useEffect(() => {
    console.log('SPACE ID : ', workspaceId);
    getChannelList(workspaceId)
      .then((data) => {
        console.log('get Channel List :success');
        setChannelList(data);
      })
      .catch((err) => {
        console.log('get Channel List :Fail');
        console.log(err.data);
      });
  }, [workspaceId]);

  return (
    <VStack h="100%" align="stretch" spacing={1} bg="#2B2D31" userSelect="none" w="200px" minW="200px">
      <WorkspaceBarHeader workspaceName={'test'} />

      <HStack spacing={24}>
        <Box
          display="flex"
          alignItems="center"
          h="26px"
          px={2}
          color="#949BA4"
          _hover={{ color: 'white' }}
          cursor="pointer"
          onClick={toggleChannelVisibility}
          userSelect="none"
        >
          <ChevronDownIcon
            boxSize={3}
            mr={2}
            transform={isChannelVisible ? 'rotate(0deg)' : 'rotate(-90deg)'}
            transition="transform 0.2s"
          />
          <Text fontSize="12px" fontWeight="medium">
            채널
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          h="26px"
          px={2}
          color="#9F9FA0"
          _hover={{ color: 'white' }}
          cursor="pointer"
          onClick={onOpen}
        >
          <Tooltip label="채널 추가" hasArrow bg="gray.700" color="white" placement="right">
            <AddIcon boxSize={3} mr={2} />
          </Tooltip>
        </Box>
      </HStack>

      {isChannelVisible && (
        <VStack align="stretch" spacing={1} pl={7}>
          {channelList.map((channel) => (
            <Box
              key={channel.id}
              display="flex"
              alignItems="center"
              _hover={{ color: 'white' }}
              cursor="pointer"
              fontSize="15px"
              color="#949BA4"
            >
              <Text># {channel.name}</Text>
            </Box>
          ))}
        </VStack>
      )}

      {/* Modal  */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent userSelect="none">
          <ModalHeader>
            <Text fontSize="xs" color="gray.500" mb={1}>
              채널의
            </Text>
            <Text>채널추가</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="# 새로운 채널"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onHandleAddChannel}
              isDisabled={!newChannelName.trim()}
              cursor={!newChannelName.trim() ? 'not-allowed' : 'pointer'}
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
  );
};
export default WorkspaceBar;
