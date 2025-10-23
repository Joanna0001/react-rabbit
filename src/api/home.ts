import apiClient from '@/config/axios';
import type { Banner } from '@/types/home';
import type { NewGoods, HotGoods } from '@/types/goods';
import type { GoodsResponse } from '@/types/category';

// 获取banner
export const getBanner = (distributionSite: number) =>
  apiClient.get<Banner[]>(`/home/banner?distributionSite=${distributionSite}`);

// 获取新鲜好物
export const getNewGoods = () => apiClient.get<NewGoods[]>('/home/new');

// 获取人气推荐
export const getHotGoods = () => apiClient.get<HotGoods[]>('/home/hot');

// 获取-商品列表
export const getGoodsList = () => apiClient.get<GoodsResponse[]>('/home/goods');
