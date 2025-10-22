import apiClient from '@/config/axios';
import type { Banner } from '@/types/home';

// 获取banner
export const getBanner = () => apiClient.get<Banner[]>('/home/banner');
