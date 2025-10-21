import { ConfigProvider } from 'antd';

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#27ba9b',
          colorSuccess: '#1dc779',
          colorWarning: '#ffb302',
          colorError: '#cf4444',

          // 派生变量，影响范围小
          colorBgContainer: '#f6ffed',
        },
      }}
    ></ConfigProvider>
  );
}
