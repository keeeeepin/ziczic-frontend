import { Client } from "@stomp/stompjs";
import { create } from "zustand";

interface ISocketClient {
    client: Client | null; 
    isConnected: boolean;
    setClient: (client: Client) => void; 
    setIsConnected: (isConnected: boolean) => void; 
}

const useSocketClientStore = create<ISocketClient>((set) => ({
    client: null, 
    isConnected: false, 
    setClient: (client) => set({client}),
    setIsConnected: (isConnected) => set({ isConnected })
}));

export default useSocketClientStore; 