import { Button, ConfigProvider, Space } from 'antd';
import React from 'react';
import './App.css'

const App: React.FC = () => (
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
  >
    <Space>
      <Button type="primary">Primary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="link">Link</Button>
    </Space>
  </ConfigProvider>
);

export default App;
