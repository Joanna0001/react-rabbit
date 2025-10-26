import type { CategoriesItem } from './category';

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

export type GoodsRequest = {
  categoryId: string;
  page: number;
  pageSize: number;
  sortField: string;
};

export type OptionsProps = {
  name: string;
  value: string;
};

export type SkuProps = {
  id: string;
  inventory: number;
  oldPrice: string;
  picture: string;
  price: string;
  skuCode: string;
  specs: Array<{
    name: string;
    valueName: string;
  }>;
};

export type AddressProps = {
  address: string;
  addressTags: string;
  cityCode: string;
  contact: string;
  countryCode: string;
  fullLocation: string;
  id: string;
  isDefault: number;
  postalCode: string;
  provinceCode: string;
  receiver: string;
};

export type DetailsProps = {
  pictures: string[];
  properties: OptionsProps[];
};

export type GoodsInfoResponse = {
  brand: BrandProps;
  categories: CategoriesItem[];
  collectCount: number;
  commentCount: number;
  desc: string;
  details: DetailsProps;
  discount: number;
  hotByDay: Goods[];
  id: string;
  inventory: number;
  isCollect: boolean;
  isPreSale: boolean;
  mainPictures: string[];
  mainVideos: string[];
  name: string;
  oldPrice: string;
  price: string;
  recomments: string;
  salesCount: number;
  similarProducts: Goods[];
  skus: SkuProps[];
  specs: Array<{
    id: string;
    name: string;
    values: Array<{
      desc: string;
      name: string;
      picture: string;
    }>;
  }>;
  spuCode: string;
  userAddresses: AddressProps[];
  videoScale: number;
};
