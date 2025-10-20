/**
 * 常量定义
 */

// API 相关
export const API_TIMEOUT = 10000;
export const TOKEN_KEY = 'token';

// 分页相关
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

// 页面样式css
export const MAX_WIDTH = '1240px';

// 状态常量
export const Status = {
  ENABLED: 1,
  DISABLED: 0,
} as const;

// 用户角色
export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;
