import { useQuery } from '@tanstack/react-query';
import { getCategory, getCategoryById } from '@/api/category';

export const useCategoryQuery = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: getCategory,
  });
};

export const useCategoryByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['categoryById', id],
    queryFn: () => getCategoryById(id!),
    enabled: !!id,
  });
};
