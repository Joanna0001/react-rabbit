import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import zhCN from 'antd/locale/zh_CN';
import '@ant-design/v5-patch-for-react-19';
import './index.css';
import router from './router';
import { queryClient } from './config/reactQuery';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: '#27ba9b',
            colorSuccess: '#1dc779',
            colorWarning: '#ffb302',
            colorError: '#cf4444',
            fontFamily:
              "'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', 'STHeiti', 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
);
