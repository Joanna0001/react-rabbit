import { useQuery } from '@tanstack/react-query';
import { getBanner, getNewGoods, getHotGoods, getGoodsList } from '@/api/home';

export const useBannerQuery = (distributionSite: number) => {
  return useQuery({
    queryKey: ['banner'],
    queryFn: () => getBanner(distributionSite),
  });
};

export const useNewGoodsQuery = () => {
  return useQuery({
    queryKey: ['newGoods'],
    queryFn: getNewGoods,
    select: data => {
      return data.sort((a, b) => (a.orderNum || 0) - (b.orderNum || 0));
    },
  });
};

export const useHotGoodsQuery = () => {
  return useQuery({
    queryKey: ['hotGoods'],
    queryFn: getHotGoods,
  });
};

export const useGoodsListQuery = () => {
  return useQuery({
    queryKey: ['goodsList'],
    queryFn: getGoodsList,
  });
};
