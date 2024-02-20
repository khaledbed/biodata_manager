import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Table, Space, Button, Tag, Input } from 'antd';
import DashboardMenu from './DashboardMenu'; 
import { getAllSamples } from '../../services/apiService';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const Samples = () => {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      const response = await getAllSamples();
      setSamples(response.samples);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching samples:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredSamples = samples.filter(sample =>
    Object.values(sample).some(value => {
      if (typeof value === 'string' || typeof value === 'number') {
        return value.toString().toLowerCase().includes(searchText.toLowerCase());
      } else if (typeof value === 'object') {
        return Object.values(value).some(val => val.toString().toLowerCase().includes(searchText.toLowerCase()));
      }
      return false;
    })
  );

  const columns = [
    {
      title: 'Sample Name',
      dataIndex: 'sample_name',
      key: 'sample_name',
    },
    {
      title: 'Sample Type',
      dataIndex: 'sample_type',
      key: 'sample_type',
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      render: data => (
        <Space size="middle">
          {Object.entries(data).map(([key, value]) => (
            <Tag key={key}>{`${key}: ${value}`}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Metadata',
      dataIndex: 'metadata',
      key: 'metadata',
      render: metadata => (
        <Space size="middle">
          {Object.entries(metadata).map(([key, value]) => (
            <Tag key={key}>{`${key}: ${value}`}</Tag>
          ))}
        </Space>
      ),
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
            <Breadcrumb.Item>Samples</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content">
            <h2>Samples</h2>
            <div style={{ marginBottom: 16 }}>
              <Search placeholder="Search samples" onSearch={handleSearch} enterButton />
            </div>
            <Table dataSource={filteredSamples} columns={columns} loading={loading} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Dashboard ©2024 Created by MBD Team</Footer>
      </Layout>
    </Layout>
  );
};

export default Samples;
