import { Space, Divider, Typography, Modal } from 'antd';
import styles from './NavHeader.module.css';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';

export function NavHeader() {
  const { isLogin, userInfo, logout } = useUserStore();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();

  const handleLogout = () => {
    modal.confirm({
      title: '退出登录',
      content: '您确定要退出登录吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        logout();
        navigate('/login');
      },
    });
  };

  return (
    <div className={styles.container}>
      {contextHolder}
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
            <a className={styles.navLink} onClick={handleLogout} href="javascript:;">
              退出登录
            </a>
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
              请先登录
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
