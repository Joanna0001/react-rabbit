import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserInfo } from '@/types/user';

interface UserState {
  userInfo: UserInfo | null;
  token: string | null;
  isLogin: boolean;
  setUserInfo: (info: UserInfo) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      userInfo: null,
      token: null,
      isLogin: false,
      setUserInfo: info => set({ userInfo: info, isLogin: true }),
      setToken: token => set({ token }),
      logout: () => set({ userInfo: null, token: null, isLogin: false }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
