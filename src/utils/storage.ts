/**
 * localStorage 封装
 */
export const storage = {
  get: <T = unknown>(key: string): T | null => {
    const value = localStorage.getItem(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return value as T;
    }
  },
  set: (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
  clear: (): void => {
    localStorage.clear();
  },
};

/**
 * sessionStorage 封装
 */
export const session = {
  get: <T = unknown>(key: string): T | null => {
    const value = sessionStorage.getItem(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return value as T;
    }
  },
  set: (key: string, value: unknown): void => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string): void => {
    sessionStorage.removeItem(key);
  },
  clear: (): void => {
    sessionStorage.clear();
  },
};
