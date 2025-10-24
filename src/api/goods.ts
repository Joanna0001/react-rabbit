import apiClient from '@/config/axios';
import type { Goods, GoodsInfoResponse, GoodsRequest } from '@/types/goods';
import type { PageData } from '@/types';

export const getGoodsByCategoryId = (data: GoodsRequest) =>
  apiClient.post<PageData<Goods>>('/category/goods/temporary', data);

export const getGoodsById = (id: string) => apiClient.get<GoodsInfoResponse>(`/goods?id=${id}`);
