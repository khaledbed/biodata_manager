// MetadataSearch.js

import React, { useState } from 'react';
import { Layout, Breadcrumb, Form, Input, Button, Table, Space } from 'antd';
import DashboardMenu from './DashboardMenu';
import { getDatasetMetadata } from '../../services/apiService';

const { Header, Content, Footer } = Layout;

const MetadataSearch = () => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await getDatasetMetadata(values);
      setSearchResults(response.datasets);
    } catch (error) {
      console.error('Failed to search datasets by metadata:', error);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const columns = [
    {
      title: 'Dataset Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <Button type="primary" size="small">View</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardMenu />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Search Datasets by Metadata</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content">
            <h2>Search Datasets by Metadata</h2>
            <Form
              form={form}
              name="metadata-search-form"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="inline"
            >
              <Form.Item
                label="Key"
                name="key"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Value"
                name="value"
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Search
                </Button>
              </Form.Item>
            </Form>
            <Table dataSource={searchResults} columns={columns} loading={loading} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>BiodAta manAger  ©2024 Created by MBD Team</Footer>
      </Layout>
    </Layout>
  );
};

export default MetadataSearch;
