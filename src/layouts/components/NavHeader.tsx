import { Space, Divider, Typography } from 'antd';
import styles from './NavHeader.module.css';
import { useUserStore } from '@/store/userStore';

export function NavHeader() {
  const { isLogin, userInfo } = useUserStore();

  return (
    <div className={styles.container}>
      <Space
        split={<Divider type="vertical" style={{ backgroundColor: '#666', width: '2px' }} />}
        style={{ height: '53px' }}
      >
        {isLogin ? (
          <>
            <Typography.Link className={styles.navLink} href="#">
              <i className="iconfont icon-user"></i>
              {userInfo?.account}
            </Typography.Link>
            <Typography.Link className={styles.navLink} href="/login">
              退出登录
            </Typography.Link>
            <Typography.Link className={styles.navLink} href="/about">
              我的订单
            </Typography.Link>
            <Typography.Link className={styles.navLink} href="/contact">
              会员中心
            </Typography.Link>
          </>
        ) : (
          <>
            <Typography.Link className={styles.navLink} href="/login">
              用户注册
            </Typography.Link>
            <Typography.Link className={styles.navLink} href="/about">
              帮助中心
            </Typography.Link>
            <Typography.Link className={styles.navLink} href="/contact">
              关于我们
            </Typography.Link>
          </>
        )}
      </Space>
    </div>
  );
}
