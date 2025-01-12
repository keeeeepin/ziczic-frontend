import { useEffect, useState } from 'react';

import { HStack, Box, VStack, Circle, Text} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import WorkspaceList from '../Workspace/WorkspaceList';
import ChannelList from '../Channel/ChannelList';

const SideBar = () => {
  return (
    <HStack aling="stretch" spacing={0} h="50vh">
        <VStack w="70px" bg="gray.100" py={4} spacing={4} align="center">
            <WorkspaceList />
            <ChannelList />
        </VStack>
    </HStack>
  )
}

export default SideBar