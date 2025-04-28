import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatContainer from '../components/Chat/ChatContainer';
import WorkspaceBar from '../components/Workspace/WorkspaceBar';

const WorkspacePage = ({ setSideBar }) => {
  const { workspaceId } = useParams();

  useEffect(() => {
    console.log('workspaceId', workspaceId);

    // handleSideBar(WorkspaceBar, workspaceId); // workpsace.id 전달해야함
    setSideBar(<WorkspaceBar workspaceId={workspaceId} />);
  }, [workspaceId]);

  return (
    <>
      <ChatContainer workspaceId={workspaceId} />
    </>
  );
};

export default WorkspacePage;
