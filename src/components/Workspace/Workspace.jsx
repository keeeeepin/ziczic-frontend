import { Circle, VStack, Text, HStack, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import ChannelList from '../Channel/ChannelList';

import { useQuery } from '@tanstack/react-query';
import { getChannelList } from '../../apis/api/channel';

import { useNavigate } from 'react-router-dom';

const Workspace = ({ id, name }) => {
  const [defaultChannelId, setDefaultChannelId] = useState(0);
  const navigate = useNavigate();

  const {
    data: channelId,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['channels', id],
    // queryFn: () => getChannelList({ workspaceId: id }),
    select: (data) => data?.[0]?.id ?? 0,
    enabled: !!id,
  });

  const onClickWorkspace = () => {
    console.log('onClickWorkspace');
    navigate(`/ziczic/${id}`); // 맨앞에 / 안붙여서 WorkspacePage 랜더링이 안됐음
  };

  return (
    <>
      <Circle
        size="36px"
        bg="#313138"
        color="white"
        cursor="pointer"
        _hover={{ bg: '#4A154B' }}
        position="relative"
        onClick={onClickWorkspace}
        className="before:absolute before:left-[-12px] before:top-[2px] before:h-[32px] before:w-[3px] before:bg-white before:rounded-r before:opacity-0 hover:before:opacity-100"
      >
        {name[0].toUpperCase()}
      </Circle>
      {/* <ChannelList workspaceId={id} /> */}
    </>
  );
};

export default Workspace;
