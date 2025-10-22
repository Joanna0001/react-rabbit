import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { NavHeader, MenuHeader, FixedHeader } from './components/NavHeader';
import { FooterInfo, FooterSlogan } from './components/Footer';
import { useState, useEffect } from 'react';

const { Header, Content, Footer } = Layout;

const headerStyle = {
  padding: 0,
  backgroundColor: '#fff',
  height: 'auto',
  lineHeight: 'normal',
};

export default function MainLayout() {
  const [isFixed, setIsFixed] = useState(false);

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
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center', padding: 0 }}>
        <FooterSlogan />
        <FooterInfo />
      </Footer>
    </Layout>
  );
}
