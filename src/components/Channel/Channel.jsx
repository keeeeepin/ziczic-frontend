import { Box, Text } from '@chakra-ui/react';
import ChatArea from '../Chat/ChatContainer';

const Channel = ({ id, name }) => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        h="26px"
        px={2}
        borderRadius="4px"
        _hover={{ bg: '#27242C' }}
        cursor="pointer"
      >
        <Text fontSize="lg" mr={2} color="#9F9FA0">
          #
        </Text>
        <Text fontSize="sm" color="#9F9FA0">
          {name}
        </Text>
      </Box>
    </>
  );
};

export default Channel;
