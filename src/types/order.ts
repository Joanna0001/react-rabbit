import type { AddressProps, PreGoods } from './goods';

export type GenerateOrderResponse = {
  goods: PreGoods[];
  summary: {
    discountPrice: number;
    goodsCount: number;
    postFee: number;
    totalPayPrice: number;
    totalPrice: number;
  };
  userAddresses: AddressProps[];
};
