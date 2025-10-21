import { Divider, Space } from 'antd';

export function FooterInfo() {
  return (
    <div>
      <Space split={<Divider type="vertical" style={{ backgroundColor: '#ccc' }} />}>
        <span>关于我们</span>
        <span>帮助中心</span>
        <span>售后服务</span>
        <span>配送与验收</span>
        <span>商务合作</span>
        <span>搜索推荐</span>
        <span>友情链接</span>
      </Space>
      <span>Copyright © 2025 小兔鲜儿</span>
    </div>
  );
}
