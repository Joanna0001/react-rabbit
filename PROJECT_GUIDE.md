# React Rabbit 项目使用指南

## 📚 项目配置完成清单

已完成的配置：

- ✅ 项目目录结构
- ✅ Prettier 代码格式化
- ✅ ESLint 代码检查
- ✅ Husky + Lint-staged Git 提交检查
- ✅ React Router 路由系统
- ✅ Axios HTTP 请求封装
- ✅ React Query 服务端状态管理
- ✅ Zustand 客户端状态管理
- ✅ TypeScript 路径别名配置
- ✅ Vite 开发服务器配置
- ✅ 基础布局和示例页面

## 🚀 下一步操作

### 1. 安装依赖

```bash
npm install
```

如果遇到依赖安装问题，可以使用：

```bash
npm install --legacy-peer-deps
```

### 2. 启动开发服务器

```bash
npm run dev
```

项目将在 http://localhost:3000 启动

### 3. 构建生产版本

```bash
npm run build
```

## 📁 目录说明

```
src/
├── api/              # API 接口定义
│   └── user.ts       # 用户相关 API
├── assets/           # 静态资源（图片、字体等）
├── components/       # 公共组件
│   ├── common/       # 通用 UI 组件
│   │   ├── Loading.tsx         # 加载组件
│   │   └── ErrorBoundary.tsx   # 错误边界
│   └── business/     # 业务组件
├── config/           # 配置文件
│   ├── axios.ts      # Axios 实例配置
│   └── reactQuery.ts # React Query 配置
├── constants/        # 常量定义
│   └── index.ts      # 通用常量
├── hooks/            # 自定义 Hooks
│   └── useUserInfo.ts # 用户信息 Hook
├── layouts/          # 布局组件
│   └── MainLayout.tsx # 主布局
├── pages/            # 页面组件
│   ├── Home/         # 首页
│   └── About/        # 关于页
├── router/           # 路由配置
│   └── index.tsx     # 路由定义
├── store/            # 状态管理
│   └── userStore.ts  # 用户状态
├── styles/           # 全局样式
│   └── global.css    # 全局 CSS
├── types/            # TypeScript 类型定义
│   └── index.ts      # 通用类型
├── utils/            # 工具函数
│   ├── storage.ts    # 本地存储封装
│   └── format.ts     # 格式化工具
├── App.tsx           # 根组件
├── main.tsx          # 入口文件
└── vite-env.d.ts     # Vite 环境变量类型
```

## 💡 核心功能使用

### 1. 路由导航

在 `src/router/index.tsx` 中添加新路由：

```tsx
{
  path: 'new-page',
  element: <NewPage />,
}
```

### 2. API 请求

```typescript
// src/api/example.ts
import request from '@/config/axios';

export const getList = () => {
  return request.get('/list');
};

export const createItem = (data: any) => {
  return request.post('/item', data);
};
```

### 3. 使用 React Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { getList, createItem } from '@/api/example';

// 查询
const { data, isLoading } = useQuery({
  queryKey: ['list'],
  queryFn: getList,
});

// 变更
const mutation = useMutation({
  mutationFn: createItem,
  onSuccess: () => {
    // 成功后的操作
  },
});
```

### 4. 状态管理 (Zustand)

```typescript
// 创建 store
import { create } from 'zustand';

interface State {
  count: number;
  increment: () => void;
}

export const useCountStore = create<State>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));

// 使用 store
const { count, increment } = useCountStore();
```

### 5. 路径别名

使用 `@` 代替 `src` 目录：

```typescript
import { xxx } from '@/utils/xxx';
import Component from '@/components/common/Loading';
```

## 🔧 开发工具命令

```bash
# 代码检查
npm run lint

# 自动修复代码问题
npm run lint:fix

# 代码格式化
npm run format

# 预览生产构建
npm run preview
```

## 📝 代码规范

项目已配置：

- **Prettier**: 自动格式化代码
- **ESLint**: 检查代码质量
- **Husky**: Git 钩子，提交前自动检查
- **Lint-staged**: 只检查暂存的文件

提交代码时会自动运行 `lint-staged`，确保代码质量。

## 🎨 主题配置

在 `src/main.tsx` 中修改 Ant Design 主题：

```typescript
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#27ba9b',  // 主色
      colorSuccess: '#1dc779',   // 成功色
      colorWarning: '#ffb302',   // 警告色
      colorError: '#cf4444',     // 错误色
    },
  }}
>
```

## 🌍 环境变量

- `.env.development` - 开发环境
- `.env.production` - 生产环境

使用方式：

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## 🔐 权限控制

可以在路由配置中添加权限检查：

```typescript
// 创建权限检查组件
const PrivateRoute = ({ children }) => {
  const { token } = useUserStore();
  return token ? children : <Navigate to="/login" />;
};

// 在路由中使用
{
  path: 'dashboard',
  element: <PrivateRoute><Dashboard /></PrivateRoute>,
}
```

## 📦 推荐的依赖库

根据项目需求，可以添加以下库：

```bash
# 日期处理
npm install dayjs

# 工具函数库
npm install lodash-es
npm install -D @types/lodash-es

# React Hooks 工具库
npm install ahooks

# 图标库（已安装）
npm install @ant-design/icons

# 图表库
npm install @ant-design/charts

# 拖拽
npm install react-beautiful-dnd
npm install -D @types/react-beautiful-dnd

# Markdown 编辑器
npm install @uiw/react-md-editor
```

## 🐛 常见问题

### 1. 路径别名不生效？

确保 `tsconfig.app.json` 和 `vite.config.ts` 都已配置路径别名。

### 2. Husky 钩子不执行？

运行 `npm run prepare` 初始化 Husky。

### 3. ESLint 错误太多？

运行 `npm run lint:fix` 自动修复大部分问题。

## 📖 参考文档

- [React 官方文档](https://react.dev/)
- [Vite 官方文档](https://vitejs.dev/)
- [Ant Design 官方文档](https://ant.design/)
- [React Router 官方文档](https://reactrouter.com/)
- [Zustand 官方文档](https://github.com/pmndrs/zustand)
- [React Query 官方文档](https://tanstack.com/query/latest)
- [Axios 官方文档](https://axios-http.com/)

## 🎯 最佳实践

1. **组件拆分**: 保持组件职责单一，易于维护
2. **类型安全**: 充分利用 TypeScript 的类型系统
3. **代码复用**: 使用自定义 Hooks 封装可复用逻辑
4. **性能优化**: 合理使用 React.memo、useMemo、useCallback
5. **错误处理**: 使用 ErrorBoundary 捕获组件错误
6. **代码规范**: 遵循 ESLint 和 Prettier 的规则

---

祝开发愉快！🚀
