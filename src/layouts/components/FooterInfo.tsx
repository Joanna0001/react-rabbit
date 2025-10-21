import { Divider, Space, Flex } from 'antd';

const spanStyle = {
  color: '#999',
};

const copyrightStyle = {
  textAlign: 'center',
  color: '#999',
  fontSize: '14px',
  marginTop: '20px',
} as const;

export function FooterInfo() {
  return (
    <div style={{ background: '#fff', padding: '50px 0', width: '100%' }}>
      <Flex justify="center">
        <Space split={<Divider type="vertical" style={{ backgroundColor: '#ccc', margin: '0 3px' }} />}>
          <span style={spanStyle}>关于我们</span>
          <span style={spanStyle}>帮助中心</span>
          <span style={spanStyle}>售后服务</span>
          <span style={spanStyle}>配送与验收</span>
          <span style={spanStyle}>商务合作</span>
          <span style={spanStyle}>搜索推荐</span>
          <span style={spanStyle}>友情链接</span>
        </Space>
      </Flex>
      <div style={copyrightStyle}>Copyright © 小兔鲜儿</div>
    </div>
  );
}
