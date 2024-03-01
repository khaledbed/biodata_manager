import React, { useState } from 'react';
import { Layout, Breadcrumb, Typography, Row, Col, Card, Button, Avatar, Divider, Descriptions, Tabs, Modal, Form, Input, Upload, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import DashboardMenu from '../Common/SideMenu';
import DashboardHeader from '../Common/Header';
import DashboardFooter from '../Common/Footer';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ProfilePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAvatarChange = info => {
    if (info.file.status === 'done') {
      setAvatarPreview(info.file.originFileObj);
    }
  };

  const uploadAvatarProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: handleAvatarChange,
  };

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

            <Tabs defaultActiveKey="1">
              <TabPane tab="Personal Information" key="1">
                <Row gutter={[24, 24]}>
                  <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                    <Card title="Personal Information">
                      <Descriptions column={1} bordered>
                        <Descriptions.Item label="Full Name">
                          <Text editable={{ onChange: value => console.log(value) }}>John Doe</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                          <Text editable={{ onChange: value => console.log(value) }}>john.doe@example.com</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone">
                          <Text editable={{ onChange: value => console.log(value) }}>+1234567890</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Address">
                          <Text editable={{ onChange: value => console.log(value) }}>123 Street, City, Country</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Bio">
                          <Text editable={{ onChange: value => console.log(value) }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Date of Birth">
                          <Text editable={{ onChange: value => console.log(value) }}>01/01/1990</Text>
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>

                  <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card title="Avatar" style={{ textAlign: 'center' }}>
                      <Avatar size={128} src={avatarPreview} icon={<UserOutlined />} />
                      <Button type="link" style={{ marginTop: '8px' }} onClick={showModal}>Change Avatar</Button>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Account Settings" key="2">
                <Card title="Account Settings">
                  <Form
                    name="account-settings"
                    onFinish={values => console.log(values)}
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Invalid email address!' }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="New Password"
                      name="password"
                      rules={[
                        { required: true, message: 'Please input your new password!' },
                        { min: 6, message: 'Password must be at least 6 characters long!' }
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Update
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </TabPane>
              {/* Additional tabs for more features can be added here */}
            </Tabs>

            <Modal title="Change Avatar" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Upload {...uploadAvatarProps}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              <p style={{ marginTop: '8px' }}>Supports JPG, PNG, GIF up to 2MB</p>
            </Modal>
          </div>
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
