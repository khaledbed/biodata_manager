import React from 'react';
import { Layout, Breadcrumb, Typography } from 'antd';
import DashboardMenu from '../Common/SideMenu';
import DashboardHeader from '../Common/Header';
import DashboardFooter from '../Common/Footer';
import UISettingsPage from './UI_SettingsPage';
import UserSettingsPage from './User_SettingsPage';
import OtherSettingsPage from './Other_SettingsPage';

const { Content } = Layout;
const { Title } = Typography;

const SettingsPage = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardMenu />
      <Layout className="site-layout">
        <DashboardHeader />
        <Content style={{ backgroundColor: '#f0f2f5', padding: 0, overflow: 'initial' }}>
          <Breadcrumb style={{ marginBottom: '24px', padding: '16px 24px' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Settings</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content" style={{ padding: '24px', minHeight: 'calc(100vh - 48px)', overflow: 'initial' }}>
            <Title level={2}>Settings</Title>
            <div style={{ marginBottom: '24px' }}>
              {/* Render UI Settings Page */}
              <UISettingsPage onFinish={onFinish} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              {/* Render User Settings Page */}
              <UserSettingsPage onFinish={onFinish} />
            </div>
            <div>
              {/* Render Other Settings Page */}
              <OtherSettingsPage onFinish={onFinish} />
            </div>
          </div>
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default SettingsPage;
