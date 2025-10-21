import { Space, Divider, Typography } from 'antd';
import styles from './NavHeader.module.css';

export function NavHeader() {
  return (
    <div className={styles.container}>
      <Space
        split={<Divider type="vertical" style={{ backgroundColor: '#666', width: '2px' }} />}
        style={{ height: '53px' }}
      >
        <Typography.Link className={styles.navLink} href="/login">
          请先登录
        </Typography.Link>
        <Typography.Link className={styles.navLink} href="/about">
          帮助中心
        </Typography.Link>
        <Typography.Link className={styles.navLink} href="/contact">
          关于我们
        </Typography.Link>
      </Space>
    </div>
  );
}
