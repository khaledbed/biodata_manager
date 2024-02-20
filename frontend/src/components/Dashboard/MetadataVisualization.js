// MetadataVisualization.js

import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Table, Tag } from 'antd';
import DashboardMenu from './DashboardMenu';
import { getAllAnnotations } from '../../services/apiService';

const { Header, Content, Footer } = Layout;

const MetadataVisualization = () => {
  const [loading, setLoading] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    fetchAnnotations();
  }, []);

  const fetchAnnotations = async () => {
    setLoading(true);
    try {
      const response = await getAllAnnotations();
      setAnnotations(response.annotations);
    } catch (error) {
      console.error('Failed to fetch annotations:', error);
    }
    setLoading(false);
  };

  const columns = [
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: content => (
        <>
          {Object.entries(content).map(([key, value]) => (
            <Tag key={key}>{`${key}: ${value}`}</Tag>
          ))}
        </>
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
            <Breadcrumb.Item>Metadata Visualization</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content">
            <h2>Metadata Visualization</h2>
            <Table dataSource={annotations} columns={columns} loading={loading} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Dashboard ©2024 Created by MBD Team</Footer>
      </Layout>
    </Layout>
  );
};

export default MetadataVisualization;
