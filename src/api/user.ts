import apiClient from '@/config/axios';
import type { LoginForm, LoginResponse } from '@/types/user';

// 用户登录
export const login = (data: LoginForm) => {
  return apiClient.post<LoginResponse>('/login', data);
};

// 退出登录
export const logout = () => {
  return apiClient.post('/user/logout');
};
