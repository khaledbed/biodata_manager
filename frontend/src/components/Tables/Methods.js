import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Table, Space, Button, Input } from 'antd';
import DashboardMenu from '../Common/SideMenu'; 
import { getAllMethods } from '../../services/apiService';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const Methods = () => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    try {
      const response = await getAllMethods();
      setMethods(response.methods);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching methods:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredMethods = methods.filter(method =>
    Object.values(method).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    {
      title: 'Name',
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
            <Breadcrumb.Item>Methods</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content">
            <h2>Methods</h2>
            <div style={{ marginBottom: 16 }}>
              <Search placeholder="Search methods" onSearch={handleSearch} enterButton />
            </div>
            <Table dataSource={filteredMethods} columns={columns} loading={loading} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>BiodAta manAger  ©2024 Created by MBD Team</Footer>
      </Layout>
    </Layout>
  );
};

export default Methods;
