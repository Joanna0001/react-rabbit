import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserInfo } from '@/types/user';

interface UserState {
  userInfo: UserInfo | null;
  token: string | null;
  setUserInfo: (info: UserInfo) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      userInfo: null,
      token: null,
      setUserInfo: info => set({ userInfo: info }),
      setToken: token => set({ token }),
      logout: () => set({ userInfo: null, token: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
