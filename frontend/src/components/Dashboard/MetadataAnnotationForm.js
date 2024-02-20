// MetadataAnnotationForm.js

import React, { useState } from 'react';
import { Layout, Breadcrumb, Form, Input, Button, message } from 'antd';
import DashboardMenu from './DashboardMenu';
import { annotateMetadata } from '../../services/apiService';

const { Header, Content, Footer } = Layout;

const MetadataAnnotationForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await annotateMetadata(values);
      message.success('Metadata annotation created successfully');
    } catch (error) {
      message.error('Failed to create metadata annotation');
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardMenu />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Create Metadata Annotation</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content">
            <h2>Create Metadata Annotation</h2>
            <Form
              name="metadata-annotation-form"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Form.Item
                label="Key"
                name="key"
                rules={[{ required: true, message: 'Please enter the key' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Value"
                name="value"
                rules={[{ required: true, message: 'Please enter the value' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Create Metadata Annotation
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Dashboard ©2024 Created by MBD Team</Footer>
      </Layout>
    </Layout>
  );
};

export default MetadataAnnotationForm;
