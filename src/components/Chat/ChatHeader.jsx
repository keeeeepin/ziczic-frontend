import React from 'react'

import { Box, VStack, HStack, Text, Avatar, Flex, Input } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useState, useEffect, useRef } from 'react';

const ChatHeader = ({channelName}) => {
  return (
      <HStack color="#F2F3F5" h="49px" px={4} borderBottom="0.3px solid" borderColor="gray.600" spacing={3}>
        <Text fontWeight="bold" fontSize="15px">
          # {channelName}
        </Text>
      </HStack>
  )
}

export default ChatHeader; 