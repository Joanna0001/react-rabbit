import APIClient from '@/config/axios';
import type { GenerateOrderResponse, SubmitOrderPayload, SubmitOrderResponse } from '@/types/order';

// 生成-订单(结算页)
export const generateOrder = () => APIClient.get<GenerateOrderResponse>('/member/order/pre');

// 提交订单(准备开始支付)
export const submitOrder = (params: SubmitOrderPayload) => APIClient.post<SubmitOrderResponse>('/member/order', params);
