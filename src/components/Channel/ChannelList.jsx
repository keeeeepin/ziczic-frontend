import { HStack, Box, VStack, Circle, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Channel from './Channel';

import { getChannelList } from '../../apis/api/channel';

import { Link } from 'react-router-dom';

const ChannelList = ({ workspaceId }) => {
  const [channelList, setChannelList] = useState([
    {
      id: 1,
      name: 'test',
    },
  ]);

  useEffect(() => {
    // channel list 조회 API
    const workspaceId = {
      workspaceId: 1,
    };

    getChannelList(workspaceId)
      .then((res) => {
        console.log('channelList Load success');

        setChannelList(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, []);

  return (
    <VStack align="stretch" p={4} spacing={1} color="white">
      <Box
        display="flex"
        alignItems="center"
        h="26px"
        px={2}
        color="#9F9FA0"
        _hover={{ color: 'white' }}
        cursor="pointer"
      >
        {channelList.map((channel) => (
          <Link key={channel.id} to={`/workspace/1/channel/${channel.id}`}>
            <Channel onClick={() => console.log()} key={channel.id} id={channel.id} name={channel.name} />
          </Link>
        ))}
      </Box>
    </VStack>
  );
};

export default ChannelList;
