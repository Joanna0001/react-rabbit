import apiClient from '@/config/axios';
import type { LoginForm, LoginResponse } from '@/types/user';

// 用户登录
export const login = (data: LoginForm) => apiClient.post<LoginResponse>('/login', data);

// 退出登录
export const logout = () => apiClient.post('/user/logout');
