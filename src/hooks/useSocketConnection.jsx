import React from 'react'

import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import useStompClientHooks from './useStompClientHooks';

import useSocketClientStore from '../store/useSocketClientStore';

const useSocketConnection = () => {

    const { setClient, setIsConnected } = useSocketClientStore();
    const { deactivateSocket } = useStompClientHooks();


    useEffect(() => {
            const client = new Client({
                brokerURL: 'ws://localhost:8080/ws',
                connectHeaders: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                },
          
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
          
                onConnect: function () {
                  setIsConnected(true); // FIX 
                  console.log('Connected!');
                },
                onDisconnect: function () {
                  setIsConnected(false);
                  console.log('Disconnected!');
                },
                debug: (str) => {
                  console.log(`STOMP Debug: ${str}`);
                },
                onStompError: function (frame) {
                  console.log('Error: ' + frame.headers['message']);
                  console.log('Details: ' + frame.body);
                },
              });
              client.activate();
              setClient(client); 

        return () => {
            deactivateSocket(); 
        }
    
      }, [setClient, setIsConnected]);

}

export default useSocketConnection