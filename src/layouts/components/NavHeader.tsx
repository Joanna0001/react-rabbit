import { Space, Divider, Typography } from 'antd';
import { MAX_WIDTH } from '@/constants';
import './NavHeader.css';

const containerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  maxWidth: MAX_WIDTH,
  margin: '0 auto',
} as const;

export function NavHeader() {
  return (
    <div style={containerStyle}>
      <Space
        split={<Divider type="vertical" style={{ backgroundColor: '#666', width: '2px' }} />}
        style={{ height: '53px' }}
      >
        <Typography.Link className="nav-link" href="/home">
          请先登录
        </Typography.Link>
        <Typography.Link className="nav-link" href="/about">
          帮助中心
        </Typography.Link>
        <Typography.Link className="nav-link" href="/contact">
          关于我们
        </Typography.Link>
      </Space>
    </div>
  );
}
