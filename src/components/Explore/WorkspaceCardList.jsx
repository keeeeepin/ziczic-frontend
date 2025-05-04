import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../apis/queryKeys';
import { getAllWorkspaceList } from '../../apis/api/workspace';
import WorkspaceCard from './WorkspaceCard';
import { Box, Flex } from '@chakra-ui/react';

const WorkspaceCardList = () => {
  const { data: allWorkspaces = [] } = useQuery({
    queryKey: QUERY_KEYS.ALL_WORKSPACES,
    queryFn: getAllWorkspaceList,
    select: (resp) => {
      console.log(resp.data[0]);
      return resp.data || [];
    },
  });

  return (
    <Box width="100%" maxWidth="100%" pl="9" height="100%">
      <Flex
        wrap="wrap"
        gap={{ base: '16px', md: '24px' }}
        justifyContent={{ base: 'center', md: 'flex-start' }}
        alignItems="center"
      >
        {allWorkspaces?.map((ws) => (
          <WorkspaceCard key={ws.id} id={ws.id} workspaceName={ws.workspaceName} createdAt={ws.createdAt} />
        ))}
      </Flex>
    </Box>
  );
};

export default WorkspaceCardList;
