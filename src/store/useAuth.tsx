import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IMember } from "../types";

interface IMemberState {
    member: IMember | null;
    accessToken: string | null; 
    setMember: (member: IMember, accessToken: string) => void; 
    clearMember: () => void;
}


export const useAuthStore = create(
    persist<IMemberState>(
        (set) => ({
            member:null,
            accessToken:null,
            setMember: (member:IMember, accessToken: string) => set({member, accessToken}),
            clearMember: () => set({member:null, accessToken: null}),
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: () => (state) => {
                const accessToken = localStorage.getItem('accessToken');
                if (state && accessToken && state.member) {
                    state.setMember(state.member, accessToken);
                }
            },
        },
    ),
);