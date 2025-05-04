import React from 'react';

import { VStack, Box, MenuButton } from '@chakra-ui/react';

const ExploreBar = () => {
  return (
    <>
      <VStack
        h="100vh"
        align="stretch"
        spacing={1}
        bg="#2B2D31"
        userSelect="none"
        _expanded={{ bg: 'gray.500', color: 'white' }}
        w="200px"
        minW="200px"
        position="relative"
      >
        {/* Bar Header */}
        <Box
          position="sticky" // 스크롤 시 상단고정
          display="flex"
          zIndex={1}
          justifyContent="center"
          top="0"
          left="0"
          alignItems="center"
          fontSize="md"
          boxShadow="base"
          color="#F2F3F5"
          fontWeight="bold"
          height="40px"
          width="200px"
        >
          Explore
        </Box>
        {/* Bar Content */}
      </VStack>
    </>
  );
};

export default ExploreBar;
