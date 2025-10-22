import { useQuery } from '@tanstack/react-query';
import { getCategory } from '@/api/category';

export const useCategoryQuery = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: getCategory,
  });
};
