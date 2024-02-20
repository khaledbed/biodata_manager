import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Table, Space, Button, Input } from 'antd';
import DashboardMenu from './DashboardMenu'; 
import { getAllAnnotations } from '../../services/apiService';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const Annotations = () => {
  const [annotations, setAnnotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchAnnotations();
  }, []);

  const fetchAnnotations = async () => {
    try {
      const response = await getAllAnnotations();
      setAnnotations(response.annotations);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching annotations:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredAnnotations = annotations.filter(annotation =>
    Object.values(annotation).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="middle">
          <Button type="primary" size="small">View</Button>
          <Button type="default" size="small">Edit</Button>
          <Button type="danger" size="small">Delete</Button>
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
            <Breadcrumb.Item>Annotations</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content">
            <h2>Annotations</h2>
            <div style={{ marginBottom: 16 }}>
              <Search placeholder="Search annotations" onSearch={handleSearch} enterButton />
            </div>
            <Table dataSource={filteredAnnotations} columns={columns} loading={loading} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Dashboard ©2024 Created by MBD Team</Footer>
      </Layout>
    </Layout>
  );
};

export default Annotations;
