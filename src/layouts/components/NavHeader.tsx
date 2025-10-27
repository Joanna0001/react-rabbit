import { Space, Divider, Typography, Modal, Flex, Spin, Input, Badge, Popover, Image, Button, message } from 'antd';
import styles from './NavHeader.module.css';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { useCategoryQuery } from '@/hooks/useCategory';
import { SearchOutlined, ShoppingCartOutlined, DeleteFilled } from '@ant-design/icons';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { deleteCart } from '@/api/cart';
import type { Cart } from '@/types/cart';
import { useQueryClient } from '@tanstack/react-query';

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
  const [messageApi, messageContextHolder] = message.useMessage();
  const queryClient = useQueryClient();

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
  const CartPopoverContent = () => {
    return (
      <div>
        {cartData?.map(item => (
          <Flex
            key={item.skuId}
            justify="space-between"
            gap={20}
            className={styles.cartItem}
            style={{ padding: '10px 15px' }}
          >
            <Image src={item.picture} alt={item.name} width={80} height={80} preview={false} />
            <Flex vertical gap={4} style={{ width: 220 }}>
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
        ))}
        <Flex
          justify="space-between"
          align="center"
          gap={20}
          style={{ backgroundColor: '#f8f8f8', height: 70, padding: '10px 15px' }}
        >
          <div>
            <div className="text-sm text-[#999]">
              共{cartData?.reduce((acc: number, item: Cart) => acc + item.count, 0)}件商品
            </div>
            <div className="text-lg text-(--price-color)">
              ￥{cartData?.reduce((acc: number, item: Cart) => acc + Number(item.price) * item.count, 0)}
            </div>
          </div>
          <Button type="primary" size="large" onClick={() => navigate('/cart')}>
            去购物车结算
          </Button>
        </Flex>
      </div>
    );
  };

  const handleDeleteCart = async (skuId: string) => {
    await deleteCart([skuId]);
    messageApi.success('删除成功');
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  };

  return (
    <div className={styles.menuContainer}>
      {messageContextHolder}
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
            <Popover placement="bottomRight" arrow styles={{ body: { padding: 0 } }} content={<CartPopoverContent />}>
              <ShoppingCartOutlined style={{ fontSize: 26, cursor: 'pointer' }} />
            </Popover>
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
