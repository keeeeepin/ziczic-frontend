import { useEffect, useState } from 'react';

import { HStack, Box, VStack, Circle, Text } from '@chakra-ui/react';

import WorkspaceBarHeader from '../Workspace/WorkspaceBarHeader';

const SideBar = () => {
  return (
    // <VStack align="stretch" spacing={1} bg="#2B2D31" userSelect="none" w="200px" minW="200px">
    <Box h="100%">
      <WorkspaceBarHeader workspaceName={'default'} />
    </Box>
    // </VStack>
  );
};
export default SideBar;
