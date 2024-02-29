import React from 'react';
import { Layout, Breadcrumb, Typography, Row, Col, Card, Button, Avatar, Divider, Descriptions } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import DashboardMenu from './DashboardMenu';
import DashboardHeader from './DashboardHeader';
import DashboardFooter from './Footer';

const { Content } = Layout;
const { Title, Text } = Typography;

const ProfilePage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardMenu />
      <Layout className="site-layout">
        <DashboardHeader />
        <Content style={{ backgroundColor: '#f0f2f5', padding: 0, overflow: 'initial' }}>
          <Breadcrumb style={{ marginBottom: '24px', padding: '16px 24px' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
          </Breadcrumb>

          <div className="site-layout-background dashboard-content" style={{ padding: '24px', minHeight: 'calc(100vh - 48px)', overflow: 'initial' }}>
            <Title level={2}>Profile Details</Title>
            <Divider />

            <Row gutter={[24, 24]}>
              <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <Card title="Personal Information">
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label="Full Name">John Doe</Descriptions.Item>
                    <Descriptions.Item label="Email">john.doe@example.com</Descriptions.Item>
                    <Descriptions.Item label="Phone">+1234567890</Descriptions.Item>
                    <Descriptions.Item label="Address">123 Street, City, Country</Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card title="Account Settings" style={{ marginTop: '24px' }}>
                  <Button type="primary" style={{ marginRight: '16px' }}>Change Password</Button>
                  <Button type="default">Update Email</Button>
                </Card>
              </Col>

              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Card title="Avatar" style={{ textAlign: 'center' }}>
                  <Avatar size={128} icon={<UserOutlined />} />
                  <Button type="link" style={{ marginTop: '8px' }}>Change Avatar</Button>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
