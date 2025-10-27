import APIClient from '@/config/axios';
import type { Cart } from '@/types/cart';

export const getCartList = () => APIClient.get<Cart[]>('/member/cart');

export const addCart = (skuId: string, count: number) => APIClient.post<Cart>('/member/cart', { skuId, count });

export const deleteCart = (ids: string[]) => APIClient.delete<void>(`/member/cart`, { data: { ids } });
