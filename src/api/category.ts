import apiClient from '@/config/axios';
import type { categoryResponse, categoryItem } from '@/types/category';

// 获取分类
export const getCategory = () => apiClient.get<categoryResponse[]>('/home/category/head');

export const getCategoryById = (id: string) => apiClient.get<categoryItem>(`/category?id=${id}`);
