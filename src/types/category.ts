import type { goods } from './goods';

export type categoryItem = {
  children: categoryItem | null;
  goods?: goods[];
  id: string;
  name: string;
  picture: string;
};

export type categoryResponse = {
  id: string;
  name: string;
  picture: string;
  children?: categoryResponse[] | [];
};
