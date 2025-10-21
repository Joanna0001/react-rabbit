export interface LoginForm {
  account: string;
  password: string;
  agree?: boolean;
}

export type UserInfo = {
  id: string;
  account: string;
  avatar: string;
  birthday: string;
  gender: string;
  nickname: string;
  mobile: string;
  cityCode: string;
  provinceCode: string;
  profession: string;
};

export type LoginResponse = {
  token: string;
} & UserInfo;
