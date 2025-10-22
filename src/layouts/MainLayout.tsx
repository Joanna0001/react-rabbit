import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
import { NavHeader } from './components/NavHeader';
import { FooterInfo, FooterSlogan } from './components/Footer';

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ height: '53px', backgroundColor: '#333' }}>
        <NavHeader />
      </Header>

      <Content style={{ padding: '24px 50px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', padding: 0 }}>
        <FooterSlogan />
        <FooterInfo />
      </Footer>
    </Layout>
  );
}
