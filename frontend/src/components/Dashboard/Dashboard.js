import React from 'react';
import { Layout, Breadcrumb, Divider, Typography, Row, Col, Card, Button, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { DatabaseOutlined, HistoryOutlined } from '@ant-design/icons';

import DashboardMenu from '../Common/SideMenu'; 
import HomeStatistics from './HomeStatistics';
import DashboardFooter from '../Common/Footer';
import DashboardHeader from '../Common/Header';

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardMenu />
      <Layout className="site-layout">
        <DashboardHeader />
        <Content style={{ backgroundColor: '#f0f2f5', padding: 0, overflow: 'initial' }}>
          <Breadcrumb style={{ marginBottom: '24px', padding: '16px 24px' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>

          <div className="site-layout-background dashboard-content" style={{ padding: '24px', minHeight: 'calc(100vh - 48px)', overflow: 'initial' }}>
            <HomeStatistics />
            <DashboardFooter />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
