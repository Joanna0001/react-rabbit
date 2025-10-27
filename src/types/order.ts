import type { AddressProps, PreGoods } from './goods';

export type GenerateOrderResponse = {
  goods: PreGoods[];
  summary: {
    discountPrice: number;
    goodsCount: number;
    postFee: number;
    totalPayPrice: number; // 商品实付价格小计
    totalPrice: number; // 商品小计总价
  };
  userAddresses: AddressProps[];
};

export type SubmitOrderPayload = {
  deliveryTimeType: number; // 默认为1即可
  payType: number; // 默认为1即可(在线支付)
  payChannel: number; // 默认为1即可(支付宝支付-此项目只支持支付宝) 1支付宝、2微信
  buyerMessage: string;
  goods: Array<{
    skuId: string;
    count: number;
  }>;
  addressId: string;
};

export type SubmitOrderResponse = {
  id: string; // 订单id
  createTime: string; // 订单创建时间
  payType: number; // 订单支付方式，1为在线支付，2为货到付款
  orderState: number; // 订单状态，1为待付款，2为待发货，3为待收货，4为待评价，5为已完成，6为已取消
  payLatestTime: string; // 订单付款截止时间，到余的秒数，前台转换成分钟、秒数
  postFee: number; // 订单邮费
  payMoney: number; // 订单实付金额
  totalMoney: number; // 订单金额合计
  totalNum: number; // 订单数量合计
  skus: string[]; // 订单商品sku的集合
  payChannel: number; // 订单支付渠道，1支付宝，2微信
  countdown: number; // 订单倒计时，到余的秒数 -1 表示已经超时，正数表示倒计时未结束
};
