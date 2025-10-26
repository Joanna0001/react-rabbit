import { useQuery } from '@tanstack/react-query';
import { getCartList } from '@/api/cart';

export const useCart = (enabled = true) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCartList,
    enabled, // 只有 enabled 为 true 时才会发起请求
  });
};
