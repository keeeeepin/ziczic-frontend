import { HStack, Box, Text } from '@chakra-ui/react';

const ChatMessage = ({ msg }) => {
  return (
    <>
      <HStack alignItems="start" p={2} _hover={{ bg: 'gray.700' }}>
        {/* <Avatar size="sm" name={`User ${msg}`} src={`/api/placeholder/32/32`} /> */}
        <Box pl={2} color="#F2F3F5">
          <HStack spacing={2}>
            <Text fontWeight="bold" fontSize="15px">
              {msg.memberName}
            </Text>

            <Text fontSize="12px" color="gray.500">
              {msg.createdAt}
            </Text>
          </HStack>
          <Text fontSize="14px">{msg.content}</Text>
        </Box>
      </HStack>
    </>
  );
};

export default ChatMessage;
