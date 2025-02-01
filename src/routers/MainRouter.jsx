import { Route, Routes } from 'react-router-dom';

import WorkspaceList from '../components/Workspace/WorkspaceList';
import GlobalMenuBar from '../components/shared/GlobalMenuBar';
import FriendPage from '../pages/FriendPage';

import { Box } from '@chakra-ui/react';

import { useState, useEffect, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../apis/queryKeys';

import { getWorkspaceList } from '../apis/api/workspace';
import { Client } from '@stomp/stompjs'; // Stomp 대신 Client import
import WorkspacePage from '../pages/WorkspacePage';
import WorkspaceBar from '../components/Workspace/WorkspaceBar';

import useSubscribe from '../hooks/useSubscribe';

const MainRouter = () => {

  const [sideBar, setSideBar] = useState(null);
  const stompClient = useRef(null);

  const { data: workspaceList} = useQuery({
    queryKey: QUERY_KEYS.WORKSPACES,
    queryFn: getWorkspaceList,
    select: (resp) => resp.data
  });

  // websocket 연결 설정
  const connect = () => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {},

      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: function () {
        console.log('Connected!');
      },
      onDisconnect: function () {
        console.log('Disconnected!');
      },
      onStompError: function (frame) {
        console.log('Error: ' + frame.headers['message']);
        console.log('Details: ' + frame.body);
      },
    });

    client.activate();
    stompClient.current = client;
  };

  useEffect(() => {
    connect();
  }, []);

  // workspaces subscribe 
  useSubscribe(workspaceList);


  return (
    <Box display={'flex'}>
    {/* <Box> */}
      <WorkspaceList />
      <Box>
      {sideBar}
      </Box>
      {/* <GlobalMenuBar /> */}

      <Routes>
        <Route path={'/main'} element={<FriendPage />} />
        <Route path={'/channel/:workspaceId/:channelId'} element={<WorkspacePage setSideBar={setSideBar} />} />
      </Routes>
      
    </Box>
  )
}

export default MainRouter; 