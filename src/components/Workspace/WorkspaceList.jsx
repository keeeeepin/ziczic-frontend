import { HStack, VStack, Circle, Box} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

import Workspace from './Workspace';
import { getWorkspaceList } from '../../apis/api/workspace';
import ChannelList from '../Channel/ChannelList';

const WorkspaceList = () => {
  const [workspaceList, setWorkspaceList] = useState([]);

  useEffect(() => {
    // workspaceList 조회 api 호출
    getWorkspaceList()
      .then((res) => {
        console.log('success');
        console.log(res.data);
        setWorkspaceList(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, []);

  return (
    <HStack align="stretch" spacing={0} h="50vh">
      <VStack w="70px" bg="gray.100" py={4} spacing={4} align="center">
        {workspaceList.map((workspace) => (
          <Workspace key={workspace.id} name={workspace.workspaceName} />
        ))}
        <Circle size="30px" bg="gray.300" color="gray.600" cursor="pointer" _hover={{ bg: 'gray.500' }}>
          <AddIcon boxSize={3} />
        </Circle>
      </VStack>
      {/* <ChannelList /> */}
    </HStack>
  );
};

export default WorkspaceList;
