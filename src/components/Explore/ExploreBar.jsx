import React from 'react';

import { VStack, Box, MenuButton } from '@chakra-ui/react';

const ExploreBar = () => {
  return (
    <>
      <VStack
        h="100%"
        pl={2}
        align="stretch"
        spacing={1}
        bg="#2B2D31"
        userSelect="none"
        _expanded={{ bg: 'gray.500', color: 'white' }}
        w="100%"
        minW="200px"
      >
        {/* Bar Header */}
        <Box
          justifyContent={'content-between'}
          alignItems="center"
          fontSize="md"
          boxShadow="base"
          color="#F2F3F5"
          ml={3}
          fontWeight="bold"
        >
          Explore
        </Box>
        {/* Bar Content */}
      </VStack>
    </>
  );
};

export default ExploreBar;
