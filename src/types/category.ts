import type { Goods } from './goods';

export type categoryItem = {
  children: categoryItem | null;
  goods?: Goods[];
  id: string;
  name: string;
  picture: string;
};

export type categoryResponse = {
  id: string;
  name: string;
  picture: string;
  goods: Goods[];
  children?: categoryResponse[] | [];
};

export type GoodsResponse = {
  saleInfo: string;
} & categoryResponse;
