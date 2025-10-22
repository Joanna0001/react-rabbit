import apiClient from '@/config/axios';
import type { categoryResponse } from '@/types/category';

// 获取分类
export const getCategory = () => apiClient.get<categoryResponse[]>('/home/category/head');
