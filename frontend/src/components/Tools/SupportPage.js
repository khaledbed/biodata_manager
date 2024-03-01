import React from 'react';
import { Layout, Breadcrumb, Typography, Row, Col, Card, Input, Divider, Tag, Button } from 'antd';
import {
  SearchOutlined,
  BulbOutlined,
  ToolOutlined,
  AlertOutlined,
} from '@ant-design/icons';

import DashboardMenu from '../Common/SideMenu';
import DashboardHeader from '../Common/Header';
import DashboardFooter from '../Common/Footer';

const { Content } = Layout;
const { Title } = Typography;

const SupportPage = () => {
  // Dummy data for quick fixes
  const quickFixes = [
    { title: 'Clear Cache', description: 'Learn how to clear cache to improve performance.' },
    { title: 'Reset Password', description: 'Reset your password in a few simple steps.' },
    { title: 'Fix Connectivity Issues', description: 'Troubleshoot and resolve connectivity problems.' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardMenu />
      <Layout className="site-layout">
        <DashboardHeader />
        <Content style={{ padding: '50px 50px', backgroundColor: '#f5f5f5' }}>
          <Breadcrumb style={{ marginBottom: 24 }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Support & Help</Breadcrumb.Item>
          </Breadcrumb>

          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            {/* Search Input */}
            <Input placeholder="Search..." prefix={<SearchOutlined />} style={{ marginBottom: 24, borderRadius: 24 }} />

            <Divider />

            {/* Help Topics */}
            <Title level={3} style={{ marginBottom: 24 }}>Help Topics</Title>
            <Row gutter={[24, 24]}>
              {/* Tutorials */}
              <Col xs={24} sm={12} md={12} lg={8}>
                <Card
                  hoverable
                  className="support-card"
                  title="Tutorials"
                  extra={<BulbOutlined />}
                  style={{ borderRadius: 16, boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)' }}
                >
                  <p>Find various tutorials to learn from.</p>
                </Card>
              </Col>
              {/* Account Management */}
              <Col xs={24} sm={12} md={12} lg={8}>
                <Card
                  hoverable
                  className="support-card"
                  title="Account Management"
                  extra={<ToolOutlined />}
                  style={{ borderRadius: 16, boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)' }}
                >
                  <p>Learn how to manage your account effectively.</p>
                </Card>
              </Col>
            </Row>

            <Divider />

            {/* Quick Fixes */}
            <Title level={3} style={{ marginBottom: 24 }}>Quick Fixes</Title>
            <Row gutter={[24, 24]}>
              {quickFixes.map((fix, index) => (
                <Col key={index} xs={24} sm={12} md={12} lg={8}>
                  <Card hoverable style={{ borderRadius: 16, boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)' }}>
                    <AlertOutlined /> 
                    <Title level={4} style={{ marginBottom: 8 }}>{fix.title}</Title>
                    <p>{fix.description}</p>
                    <Button type="primary" size="small">Fix Now</Button>
                  </Card>
                </Col>
              ))}
            </Row>

            <Divider />

            {/* Tags */}
            <Title level={3} style={{ marginBottom: 24 }}>Tags</Title>
            <div>
              <Tag color="#52c41a">Tutorials</Tag>
              <Tag color="#faad14">Account Management</Tag>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SupportPage;
