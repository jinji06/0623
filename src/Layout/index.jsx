import { useState, useEffect } from 'react';
import { Menu, Layout, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
import { Auth } from '@aws-amplify/auth';
import AuthContext from '../AuthContext';

const MainLayout = ({children}) => {
  const { Header, Footer, Content } = Layout;
  const [authData, setAuthData] = useState({
    isAuthenticated: false,
    email: null,
    sub: null,
    token:null
  });

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setAuthData({
        isAuthenticated: true,
        email: user.attributes.email,
        sub: user.attributes.sub,
        token:user.signInUserSession.idToken.jwtToken,
      });
    } catch {
      setAuthData({
        isAuthenticated: false,
        email: null,
        sub: null,
        token:null
      });
    }
  }

  async function handleLogout() {
    try {
      await Auth.signOut();
      setAuthData({
        isAuthenticated: false,
        email: null,
        sub: null
      });
    } catch (error) {
      message.error('認証に失敗しました');
    }
  }

  return (
    // AuthContext.Providerを追加し、認証状態を共有します
    <AuthContext.Provider value={authData} >
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Row justify="end">
          <Col xs={24} sm={24} md={24} lg={24}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
            >
              <Menu.Item key="1">
                <Link to="/dashboard">ダッシュボード</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/summary">月間サマリ</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/my_page">マイページ</Link>
              </Menu.Item>
              {authData.isAuthenticated && (
                <Menu.Item key="4" onClick={handleLogout}>
                  ログアウト
                </Menu.Item>
              )}
            </Menu>
          </Col>
        </Row>
      </Header>    
      <Row>
        <Col span={18} offset={3}>
          <Content>{children}</Content>
        </Col>
      </Row>
      <Footer>Footer</Footer>
    </Layout>
    </AuthContext.Provider>
  );
}

export default MainLayout;
