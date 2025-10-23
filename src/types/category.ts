import type { Goods, BrandProps } from './goods';

export type CategoriesParent = {
  id: string;
  name: string;
  layer: number;
  parent: CategoriesParent;
};

export type CategoriesItem = {
  id: string;
  name: string;
  layer: number;
  parent: CategoriesParent;
};

export type CategoryChildrenProps = {
  brands: BrandProps;
  categories: CategoriesItem[];
  goods: Goods[];
  id: string;
  name: string;
  parentId: string;
  picture: string;
  saleProperties: string;
};

export type categoryItem = {
  children: categoryItem[] | [];
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
