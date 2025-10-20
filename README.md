# React Rabbit

基于 React 19 + TypeScript + Vite + Ant Design 的现代化前端项目模板

## ✨ 特性

- ⚡️ **React 19** - 最新版本的 React
- 🔷 **TypeScript** - 类型安全的 JavaScript
- ⚡️ **Vite** - 极速的开发体验
- 🎨 **Ant Design** - 企业级 UI 设计语言
- 🚦 **React Router v7** - 声明式路由管理
- 🐻 **Zustand** - 轻量级状态管理
- 🔄 **React Query** - 强大的服务端状态管理
- 📡 **Axios** - HTTP 请求封装
- 💅 **Prettier** - 代码格式化
- 🔍 **ESLint** - 代码质量检查
- 🐶 **Husky** - Git hooks
- 🎯 **Lint-staged** - 提交前代码检查

## 📦 目录结构

```
src/
├── api/              # API 接口
├── assets/           # 静态资源
├── components/       # 公共组件
│   ├── common/       # 通用 UI 组件
│   └── business/     # 业务组件
├── config/           # 配置文件
├── constants/        # 常量定义
├── hooks/            # 自定义 Hooks
├── layouts/          # 布局组件
├── pages/            # 页面组件
├── router/           # 路由配置
├── store/            # 状态管理
├── styles/           # 全局样式
├── types/            # TypeScript 类型定义
└── utils/            # 工具函数
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

### 自动修复代码问题

```bash
npm run lint:fix
```

### 代码格式化

```bash
npm run format
```

## 📝 使用说明

### 路径别名

项目已配置 `@` 作为 `src` 目录的别名：

```typescript
import { xxx } from '@/utils/xxx';
import Component from '@/components/xxx';
```

### 环境变量

- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

### API 请求

使用封装好的 axios 实例：

```typescript
import request from '@/config/axios';

// GET 请求
request.get('/api/users');

// POST 请求
request.post('/api/login', { username, password });
```

### 状态管理

使用 Zustand：

```typescript
import { useUserStore } from '@/store/userStore';

const { userInfo, setUserInfo } = useUserStore();
```

### 路由配置

在 `src/router/index.tsx` 中配置路由

## 🔧 配置说明

- `vite.config.ts` - Vite 配置
- `tsconfig.json` - TypeScript 配置
- `.eslintrc` - ESLint 配置
- `.prettierrc` - Prettier 配置
- `.lintstagedrc.json` - Lint-staged 配置

## 📄 License

MIT
