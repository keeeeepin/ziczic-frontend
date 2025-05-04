import React from 'react';
import useSocketClientStore from '../store/useSocketClientStore';
import useStompClientHooks from './useStompClientHooks';

import { useEffect } from 'react';

const useChannelSubscribe = (channelList) => {
  const { client, isConnected } = useSocketClientStore();
  const { subscribe, unsubscribe } = useStompClientHooks();

  useEffect(() => {
    console.log(channelList);
    // channelList.map((channel) => console.log(channel));
    if (channelList && isConnected && client) {
      console.log(channelList);
      channelList.data.map((channel) => {
        const subscription = subscribe(`/sub/workspaces.1.channels.1`, (message) => {
          const chatMessage = JSON.parse(message.body);
          console.log(`Received channel chat`, chatMessage);
        });
      });
    }
  }, [channelList, isConnected, client]);

  return <div>useChannelSubscribe</div>;
};

export default useChannelSubscribe;
