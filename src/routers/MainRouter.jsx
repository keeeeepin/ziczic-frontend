import { Route, Routes } from 'react-router-dom';

import WorkspaceList from '../components/Workspace/WorkspaceList';
import GlobalMenuBar from '../components/shared/GlobalMenuBar';
import FriendPage from '../pages/FriendPage';

import { Box, VStack } from '@chakra-ui/react';

import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../apis/queryKeys';

import { getWorkspaceList } from '../apis/api/workspace';
import { Client } from '@stomp/stompjs'; // Stomp 대신 Client import
import WorkspacePage from '../pages/WorkspacePage';
import WorkspaceBar from '../components/Workspace/WorkspaceBar';

import useWorkSpaceSubscribe from '../hooks/useWorkSpaceSubscribe';
import useSocketClientStore from '../store/useSocketClientStore';

import useSocketConnection from '../hooks/useSocketConnection';
import SideBar from '../components/SideBar/SideBar';
import UserProfile from '../components/Auth/UserProfile';

const MainRouter = () => {
  // const [sideBar, setSideBar] = useState(<SideBar />);
  const [sideBar, setSideBar] = useState(<div>Loading ..</div>);

  const handleSideBar = useCallback((Component, workspaceId) => {
    console.log('Main Router Workspace Id : ', workspaceId);
    setSideBar(<Component spaceId={workspaceId} />);
  }, []);

  const stompClient = useRef(null);
  const { setClient, setIsConnected } = useSocketClientStore();

  const { data: workspaces } = useQuery({
    queryKey: QUERY_KEYS.WORKSPACES,
    queryFn: getWorkspaceList,
    select: (resp) => {
      console.log('resp data :', resp.data);
      return resp.data || [];
    },
    staleTime: 0,
    refetchOnMount: true,
    // refetchOnWindowFocus: true,
  });

  useSocketConnection();
  // useWorkSpaceSubscribe(workspaces);

  return (
    <Box display={'flex'}>
      <WorkspaceList />

      <VStack align="stretch" spacing={1} bg="#2B2D31" userSelect="none" w="200px" minW="200px">
        {sideBar}
        <UserProfile />
      </VStack>
      <Routes>
        <Route path={'/main'} element={<FriendPage />} />
        <Route path={'/:workspaceId'} element={<WorkspacePage setSideBar={setSideBar} />} />
      </Routes>
    </Box>
  );
};

export default MainRouter;
