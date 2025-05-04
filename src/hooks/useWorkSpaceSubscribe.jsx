import { useEffect, useRef } from 'react';
// import { StompSubscription } from '@stomp/stompjs';

import useSocketClientStore from '../store/useSocketClientStore';
import useStompClientHooks from './useStompClientHooks';

const useWorkSpaceSubscribe = (workspaces) => {
  const { client, isConnected } = useSocketClientStore();
  const { subscribe, unsubscribe } = useStompClientHooks();

  const subscriptionsRef = useRef(new Map());

  useEffect(() => {
    if (workspaces && isConnected && client) {
      const existingSubscriptions = subscriptionsRef.current;

      // 구독되지 않은 새로운 방 구독
      workspaces.forEach((workspace) => {
        if (!existingSubscriptions.has(workspace.id)) {
          console.log('====== subscribe ... ======');
          const subscription = subscribe(`/sub/workspaces.${workspace.id}`, (message) => {
            const chatMessage = JSON.parse(message.body);
            console.log(`Received message in room ${workspace.id}:`, chatMessage);
            // 추가 설정
          });
          if (subscription) {
            existingSubscriptions.set(workspace.id, subscription);
          }
        }
      });
      console.log('===== subscribe useEffect END ===============================');
      // 더 이상 존재하지 않는 방의 구독 해제
      // existingSubscriptions.forEach((subscription, id) => {
      //   if (!currentRoomIds.has(id)) {
      //     unsubscribe(subscription);
      //     existingSubscriptions.delete(id);
      //   }
      // });
    }

    // 연결이 끊어지면 모든 구독 해제
    if (!isConnected) {
      subscriptionsRef.current.forEach((subscription) => {
        unsubscribe(subscription);
      });
      subscriptionsRef.current.clear();
    }
  }, [workspaces, isConnected, subscribe, unsubscribe, client]);
};

export default useWorkSpaceSubscribe;
