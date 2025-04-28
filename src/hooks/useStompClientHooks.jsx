import useSocketClientStore from '../store/useSocketClientStore';

const useStompClientHooks = () => {
  const { client, isConnected, setClient } = useSocketClientStore();

  const subscribe = (addr, callback) => {
    if (!client || !isConnected) 
        return null;
    
    return client.subscribe(addr, callback);
  };

  const unsubscribe = (subscription) => {
    subscription.unsubscribe();
  };

  const sendChat = (
    destination,
    body
  ) => {
    if (client && isConnected) {
      const chat = JSON.stringify(body);
      const accessToken = localStorage.getItem('token');


      console.log("send Chat ---- ", chat);
      console.log("send Chat -- accessToken :", accessToken);

      client.publish({
        destination,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: chat,
      });
    }
  };

  const deactivateSocket = () => {
    client?.deactivate();
    setClient(null);
  };
 
  return {
    subscribe,
    unsubscribe,
    sendChat,
    deactivateSocket,
  };
};

export default useStompClientHooks;
