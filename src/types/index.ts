/**
 * 全局类型定义
 */

// 通用响应结构
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 分页请求参数
export interface PageParams {
  page: number;
  pageSize: number;
}

// 分页响应数据
export interface PageData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 选项类型
export interface Option {
  label: string;
  value: string | number;
}
