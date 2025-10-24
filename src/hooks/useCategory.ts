import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getCategory, getCategoryById } from '@/api/category';
import { getGoodsByCategoryId } from '@/api/goods';
import type { GoodsRequest } from '@/types/goods';

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

export const useGoodsByCategoryIdQuery = (data: GoodsRequest) => {
  return useQuery({
    queryKey: ['goodsByCategoryId', data],
    queryFn: () => getGoodsByCategoryId(data),
  });
};

type InfiniteGoodsParams = Omit<GoodsRequest, 'page'> & { pageSize?: number };

export const useInfiniteGoodsByCategoryIdQuery = (params: InfiniteGoodsParams) => {
  const { pageSize = 20, ...base } = params;
  const query = useInfiniteQuery({
    queryKey: ['goodsByCategoryIdInfinite', base, pageSize],
    queryFn: ({ pageParam = 1 }) => getGoodsByCategoryId({ ...base, page: pageParam as number, pageSize }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined;
    },
  });
  const items = useMemo(() => {
    const seen = new Set<string>();
    const flat = query.data?.pages.flatMap(p => p.items) ?? [];
    return flat.filter(g => {
      if (seen.has(g.id)) return false;
      seen.add(g.id);
      return true;
    });
  }, [query.data]);
  return { ...query, items };
};
