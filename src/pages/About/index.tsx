import React from 'react';
import { Typography, Descriptions, Tag } from 'antd';

const { Title } = Typography;

const About: React.FC = () => {
  return (
    <div>
      <Title level={2}>关于项目</Title>

      <Descriptions bordered column={1} style={{ marginTop: 24 }}>
        <Descriptions.Item label="项目名称">React Rabbit</Descriptions.Item>
        <Descriptions.Item label="版本">0.0.0</Descriptions.Item>
        <Descriptions.Item label="描述">
          基于 React 19 + TypeScript + Vite 的现代化前端项目模板
        </Descriptions.Item>
        <Descriptions.Item label="主要技术">
          <Tag color="blue">React 19</Tag>
          <Tag color="cyan">TypeScript</Tag>
          <Tag color="green">Vite</Tag>
          <Tag color="purple">Ant Design</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="状态管理">
          <Tag color="orange">Zustand</Tag>
          <Tag color="red">React Query</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="路由">
          <Tag color="geekblue">React Router v7</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="代码规范">
          <Tag>ESLint</Tag>
          <Tag>Prettier</Tag>
          <Tag>Husky</Tag>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default About;
