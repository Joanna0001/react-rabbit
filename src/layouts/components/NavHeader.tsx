import { Space, Divider, Typography, Modal, Flex, Spin, Input, Badge } from 'antd';
import styles from './NavHeader.module.css';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { useCategoryQuery } from '@/hooks/useCategory';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Link, Text } = Typography;

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
    <div className={styles.navContainer}>
      {contextHolder}
      <div>
        <Space
          split={<Divider type="vertical" style={{ backgroundColor: '#666', width: '2px' }} />}
          style={{ height: '53px' }}
        >
          {isLogin ? (
            <>
              <Link className={styles.navLink} href="#">
                <i className="iconfont icon-user"></i>
                {userInfo?.account}
              </Link>
              <a className={styles.navLink} onClick={handleLogout} href="javascript:;">
                退出登录
              </a>
              <Link className={styles.navLink} href="/about">
                我的订单
              </Link>
              <Link className={styles.navLink} href="/contact">
                会员中心
              </Link>
            </>
          ) : (
            <>
              <Link className={styles.navLink} href="/login">
                请先登录
              </Link>
              <Link className={styles.navLink} href="/about">
                帮助中心
              </Link>
              <Link className={styles.navLink} href="/contact">
                关于我们
              </Link>
            </>
          )}
        </Space>
      </div>
    </div>
  );
}

export function MenuHeader() {
  const { data: categoryData, isLoading } = useCategoryQuery();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>();

  // 点击跳转到分类页面 并添加面包屑
  const openCategory = (name: string, id: string) => {
    navigate(`/category/${id}`, { state: { categoryId: id, categoryName: name } });
    setActiveCategory(id);
  };

  const goHomePage = () => {
    navigate('/');
    setActiveCategory('');
  };

  return (
    <div className={styles.menuContainer}>
      <Flex align="center" justify="space-between">
        <div className={styles.logo}></div>
        <Text className={styles.menuLink} onClick={goHomePage}>
          首页
        </Text>

        {isLoading ? (
          <Spin size="small" />
        ) : (
          categoryData?.map(item => (
            <Text
              key={item.id}
              className={`${styles.menuLink} ${activeCategory === item.id ? styles.activeCategory : ''}`}
              onClick={() => openCategory(item.name, item.id)}
            >
              {item.name}
            </Text>
          ))
        )}

        <Flex>
          <Input placeholder="搜一搜" variant="underlined" prefix={<SearchOutlined style={{ fontSize: 20 }} />} />
          <Badge count={10}>
            <ShoppingCartOutlined style={{ fontSize: 26 }} />
          </Badge>
        </Flex>
      </Flex>
    </div>
  );
}

export function FixedHeader({ isVisible = false }: { isVisible?: boolean }) {
  const { data: categoryData, isLoading } = useCategoryQuery();

  return (
    <div className={`${styles.menuContainer} ${styles.fixedHeader} ${isVisible ? styles.fixedHeaderVisible : ''}`}>
      <Flex align="center" justify="space-between" style={{ paddingRight: 70 }}>
        <div className={styles.fixedHeaderLogo}></div>
        <Text className={styles.menuLink}>首页</Text>

        {isLoading ? (
          <Spin size="small" />
        ) : (
          categoryData?.map(item => (
            <Text key={item.id} className={styles.menuLink}>
              {item.name}
            </Text>
          ))
        )}

        <Divider type="vertical" style={{ backgroundColor: 'var(--primary-color)', width: 2, height: 16 }} />
        <Text className={styles.menuLink}>品牌</Text>
        <Text className={styles.menuLink}>专题</Text>
      </Flex>
    </div>
  );
}
