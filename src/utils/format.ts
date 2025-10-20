/**
 * 格式化金额
 */
export const formatMoney = (value: number, decimals = 2): string => {
  return `¥${value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * 格式化数字（千分位）
 */
export const formatNumber = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 隐藏手机号中间4位
 */
export const hidePhone = (phone: string): string => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

/**
 * 隐藏邮箱部分字符
 */
export const hideEmail = (email: string): string => {
  return email.replace(/(.{2}).*(@.*)/, '$1***$2');
};
