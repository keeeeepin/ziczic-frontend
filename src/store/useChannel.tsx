import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IChannelInfo {
  selectedChannelId: number;
  selectedChannelName: string;

  selectChannel: (id: number, name: string) => void;
  clearSelection: () => void;
}

const useChannelStore = create<IChannelInfo>()(
  persist(
    (set) => ({
      // 초기 상태
      selectedChannelId: 0,
      selectedChannelName: '',

      // 액션함수들
      selectChannel: (id, name) =>
        set({
          selectedChannelId: id,
          selectedChannelName: name,
        }),

      clearSelection: () =>
        set({
          selectedChannelId: 0,
          selectedChannelName: '',
        }),
    }),
    {
      name: 'channel-storage',
    }
  )
);

export default useChannelStore;
