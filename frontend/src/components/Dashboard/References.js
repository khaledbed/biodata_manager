import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Table, Space, Button, Input } from 'antd';
import DashboardMenu from './DashboardMenu'; 
import { Link } from 'react-router-dom';
import { getAllReferences } from '../../services/apiService';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const References = () => {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    try {
      const response = await getAllReferences();
      setReferences(response.references);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching references:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredReferences = references.filter(reference =>
    Object.values(reference).some(value => {
      if (typeof value === 'string' || typeof value === 'number') {
        return value.toString().toLowerCase().includes(searchText.toLowerCase());
      }
      return false;
    })
  );

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Authors',
      dataIndex: 'authors',
      key: 'authors',
    },
    {
      title: 'Journal',
      dataIndex: 'journal',
      key: 'journal',
    },
    {
      title: 'Publication Year',
      dataIndex: 'pub_year',
      key: 'pub_year',
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
            <Breadcrumb.Item>References</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content">
            <h2>References</h2>
            <div style={{ marginBottom: 16 }}>
              <Search placeholder="Search references" onSearch={handleSearch} enterButton />
            </div>
            <Table dataSource={filteredReferences} columns={columns} loading={loading} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Dashboard ©2024 Created by MBD Team</Footer>
      </Layout>
    </Layout>
  );
};

export default References;
