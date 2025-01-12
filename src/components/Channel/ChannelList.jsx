import { HStack, Box, VStack, Circle, Text} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import Channel from './Channel';

import { getChannelList } from '../../apis/api/channel';

const ChannelList = () => {

  const [channelList, setChannelList] = useState([{
    "id": 1, 
    "name": "test"
  }]);

  useEffect(() => {
    // channel list 조회 API 
    const workspaceId = {
      workspaceId: 1
    };

    getChannelList(workspaceId)
    .then((res) => {
      console.log("success");

      setChannelList(res.data);
    })
    .catch((err) => {
      console.log(err.data); 
    });
  }, [])
  

  return (
    <>
      {channelList.map((channel) => (
        <Channel key={channel.id} name={channel.name} />
      ))}
      <Circle
        size="30px"
        bg="gray.300"
        color="gray.600"
        cursor="pointer"
        _hover={{bg: 'gray.500'}}
        >
        <AddIcon boxSize={3} />
      </Circle>
    </>
  )
}

export default ChannelList