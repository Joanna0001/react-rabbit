import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { NavHeader, MenuHeader, FixedHeader } from './components/NavHeader';
import { FooterInfo, FooterSlogan } from './components/Footer';
import { useState, useEffect } from 'react';
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb';

const { Header, Content, Footer } = Layout;

const headerStyle = {
  padding: 0,
  backgroundColor: '#fff',
  height: 'auto',
  lineHeight: 'normal',
};

export default function MainLayout() {
  const [isFixed, setIsFixed] = useState(false);
  const location = useLocation();
  const hideBreadcrumb = ['/login', '/'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsFixed(scrollTop > 53);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout>
      <Header style={headerStyle}>
        <NavHeader />
        <MenuHeader />
        <FixedHeader isVisible={isFixed} />
      </Header>

      <Content>
        {/* 全局统一渲染面包屑（不在登录页等显示时可按需隐藏） */}
        {!hideBreadcrumb.includes(location.pathname) && <CustomBreadcrumb />}
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center', padding: 0 }}>
        <FooterSlogan />
        <FooterInfo />
      </Footer>
    </Layout>
  );
}
