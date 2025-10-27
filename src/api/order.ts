import APIClient from '@/config/axios';
import type { GenerateOrderResponse } from '@/types/order';

// 生成-订单(结算页)
export const generateOrder = () => APIClient.get<GenerateOrderResponse>('/member/order/pre');
