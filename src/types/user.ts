export interface LoginForm {
  account: string;
  password: string;
  agree?: boolean;
}

export interface UserInfo {
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
  token?: string;
}
