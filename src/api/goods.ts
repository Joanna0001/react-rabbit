import apiClient from '@/config/axios';
import type { Goods, GoodsRequest } from '@/types/goods';
import type { PageData } from '@/types';

export const getGoodsByCategoryId = (data: GoodsRequest) =>
  apiClient.post<PageData<Goods>>('/category/goods/temporary', data);
