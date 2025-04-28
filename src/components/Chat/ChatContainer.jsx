import { Box, VStack, HStack, Text, Avatar, Flex, Input, Circle } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs'; // Stomp 대신 Client import

import axios from 'axios';
import useSocketClientStore from '../../store/useSocketClientStore';

import ChatHeader from './ChatHeader';
import useStompClientHooks from '../../hooks/useStompClientHooks';

import ChatMessage from './ChatMessage';
import { useQueryClient } from '@tanstack/react-query';

import { getChatHistoryList } from '../../apis/api/chat';

import useChannelStore from '../../store/useChannel';

const ChatContainer = ({ workspaceId }) => {
  const [messages, setMessages] = useState([]);

  const { selectedChannelId, selectedChannelName } = useChannelStore();

  // TODO: useRoomStore 필요
  const [inputValue, setInputValue] = useState('');

  const channelId = selectedChannelId || 1;
  const channelName = selectedChannelName || '채널';

  const inputRef = useRef(null); // 커서 잡기

  // Connection
  const { client, isConnected } = useSocketClientStore();
  const { subscribe, unsubscribe } = useStompClientHooks();
  const { sendChat } = useStompClientHooks();

  const queryClient = useQueryClient();

  const onHandleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSendMessage = () => {
    const messageToSend = inputValue;
    setInputValue('');

    if (client && isConnected) {
      console.log('client, connected');
      const body = {
        channel: { id: 1 },
        content: messageToSend,
      };

      sendChat(`/pub/workspaces.${workspaceId}.channels.${channelId}`, body);
    }
  };

  useEffect(() => {
    console.log('get Chat History');
    getChatHistoryList(workspaceId, channelId)
      .then((resp) => {
        console.log(resp);
        setMessages(resp);
      })
      .catch((err) => console.log(err));

    inputRef.current.focus();
  }, [workspaceId, channelId]); // messages 추가 -> 재랜더링

  useEffect(() => {
    if (client && isConnected) {
      const subscription = subscribe(`/sub/workspaces.${workspaceId}.channels.${channelId}`, (message) => {
        const chat = JSON.parse(message.body);
        console.log(`New message `, chat);
        // 기존 메시지에 새 메시지 추가
        setMessages((prev) => [...prev, chat]);
      });

      // 클린업 함수
      return () => {
        if (subscription) {
          unsubscribe(subscription);
        }
      };
    }
  }, [client, isConnected, workspaceId, channelId]);

  return (
    <Flex bg="#313338" flex={1} direction="column" h="100vh" borderColor="gray.200">
      <ChatHeader channelName={channelName} />

      {/* Messages Area */}
      <VStack flex={1} overflowY="auto" w="full" spacing={3} align="stretch">
        {messages.map((msg, index) => (
          <ChatMessage key={index} msg={msg} />
        ))}
      </VStack>

      {/* Message Input */}
      <Box p={4}>
        <HStack border="1px solid" borderColor="gray.300" borderRadius="4px" px={3} py={2}>
          {/* <HStack h="32px" px={2} borderBottom="1px solid" borderColor="gray.200" spacing={1}>
            <Box as="button" p={1} borderRadius="4px" _hover={{ bg: 'gray.100' }} onClick={onSendMessage}>
              <AddIcon boxSize={3} color="gray.500" />
            </Box>
          </HStack> */}
          {/* <Box > */}
          {/* <Box as="button" p={1} borderRadius="4px" _hover={{ bg: 'gray.100' }} onClick={onSendMessage}> */}

          <Circle size="20px" bg="#F2F3F5" color="white" cursor="pointer" _hover={{ bg: '#4A154B' }}>
            <AddIcon boxSize={3} color="gray.500" />
          </Circle>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSendMessage();
            }}
          >
            <Input
              value={inputValue}
              onChange={onHandleInputChange}
              placeholder={`# ${channelName}에 메시지 보내기`}
              variant="unstyled"
              fontSize="15px"
              color="#F2F3F5"
              ref={inputRef}
              sx={{
                caretColor: '#F2F3F5',
              }}
            />
          </form>
          {/* </Box> */}
        </HStack>
      </Box>
    </Flex>
  );
};

export default ChatContainer;
