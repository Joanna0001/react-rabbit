import { useQuery } from '@tanstack/react-query';
import { getGoodsById } from '@/api/goods';

export const useGoodsByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['goods', id],
    queryFn: () => getGoodsById(id),
  });
};
