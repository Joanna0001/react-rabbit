import { Space, Divider, Typography, Modal, Flex, Spin, Input, Badge, Dropdown, Image, Button } from 'antd';
import type { MenuProps } from 'antd';
import styles from './NavHeader.module.css';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { useCategoryQuery } from '@/hooks/useCategory';
import { SearchOutlined, ShoppingCartOutlined, DeleteFilled } from '@ant-design/icons';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import React from 'react';

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
  const { isLogin } = useUserStore();
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

  // 只有登录时才请求购物车数据
  const { data: cartData } = useCart(isLogin);

  // 购物车列表展示
  const cartList: MenuProps['items'] = cartData?.map(item => ({
    key: item.skuId,
    label: (
      <Flex justify="space-between" gap={20} className={styles.cartItem}>
        <Image src={item.picture} alt={item.name} width={80} height={80} preview={false} />
        <Flex vertical gap={4}>
          <div className="text-base line-clamp-2 mt-2">{item.name}</div>
          <div className="truncate text-[#999]">{item.attrsText}</div>
        </Flex>
        <Flex vertical gap={4} align="center">
          <div className="text-base text-(--price-color) mt-3.5">￥{item.price}</div>
          <div className="text-base text-[#999]">x{item.count}</div>
        </Flex>
        <Flex align="center" className={styles.deleteIcon}>
          <DeleteFilled
            style={{ fontSize: 16, color: 'var(--price-color)' }}
            onClick={() => handleDeleteCart(item.skuId)}
          />
        </Flex>
      </Flex>
    ),
  }));

  const handleDeleteCart = (skuId: string) => {
    console.log(skuId);
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
          <Badge count={cartData?.length || 0}>
            <Dropdown
              menu={{ items: cartList }}
              placement="bottomRight"
              arrow
              trigger={['click']}
              popupRender={menu => (
                <div className="bg-white">
                  {React.cloneElement(
                    menu as React.ReactElement<{
                      style: React.CSSProperties;
                    }>,
                  )}
                  <Flex style={{ padding: 8 }}>
                    <Button type="primary">Click me!</Button>
                  </Flex>
                </div>
              )}
            >
              <ShoppingCartOutlined style={{ fontSize: 26, cursor: 'pointer' }} />
            </Dropdown>
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
