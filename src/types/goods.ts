export type Goods = {
  desc: string;
  id: string;
  name: string;
  orderNum?: number;
  picture: string;
  price: string;
};

export type NewGoods = {
  discount?: string;
} & Goods;

export type HotGoods = {
  id: string;
  picture: string;
  title: string;
  alt: string;
};

export type BrandProps = {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  picture: string;
  type: number;
  desc: string;
  place: string;
};
