import request from '@/config/axios';

interface LoginParams {
  username: string;
  password: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// 用户登录
export const login = (data: LoginParams) => {
  return request.post('/user/login', data);
};

// 获取用户信息
export const getUserInfo = () => {
  return request.get<UserInfo>('/user/info');
};

// 退出登录
export const logout = () => {
  return request.post('/user/logout');
};
