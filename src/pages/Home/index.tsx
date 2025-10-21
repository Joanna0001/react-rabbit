import { Typography, Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div>
      <Title level={2}>欢迎使用 React Rabbit</Title>
      <Paragraph>这是一个基于 React 19 + TypeScript + Vite + Ant Design 的现代化项目模板</Paragraph>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="活跃用户"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="访问量"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="总销售额" value={1128} prefix="¥" />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }} title="技术栈">
        <ul>
          <li>⚡️ React 19 - 最新版本</li>
          <li>🔷 TypeScript - 类型安全</li>
          <li>⚡️ Vite - 极速构建工具</li>
          <li>🎨 Ant Design - 企业级 UI 组件库</li>
          <li>🚦 React Router v7 - 路由管理</li>
          <li>🐻 Zustand - 轻量级状态管理</li>
          <li>🔄 React Query - 服务端状态管理</li>
          <li>📡 Axios - HTTP 请求</li>
          <li>💅 Prettier + ESLint - 代码规范</li>
          <li>🐶 Husky + Lint-staged - Git 钩子</li>
        </ul>
      </Card>
    </div>
  );
}
