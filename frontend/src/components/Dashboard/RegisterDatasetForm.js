// src/components/RegisterDatasetForm.js

import React, { useState } from 'react';
import { Layout, Breadcrumb, Form, Input, Button, message } from 'antd';
import DashboardMenu from './DashboardMenu';
import { registerDataset } from '../../services/apiService';

const { Header, Content, Footer } = Layout;

const RegisterDatasetForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await registerDataset(values);
      message.success('Dataset created successfully');
    } catch (error) {
      message.error('Failed to create dataset');
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
            <Breadcrumb.Item>Register Dataset</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content">
            <h2>Register Dataset</h2>
            <Form
              name="register-dataset"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the dataset name' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter the dataset description' }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Register Dataset
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>BiodAta manAger  ©2024 Created by MBD Team</Footer>
      </Layout>
    </Layout>
  );
};

export default RegisterDatasetForm;
