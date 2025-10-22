import { useQuery } from '@tanstack/react-query';
import { getBanner } from '@/api/home';

export const useBannerQuery = () => {
  return useQuery({
    queryKey: ['banner'],
    queryFn: getBanner,
  });
};
