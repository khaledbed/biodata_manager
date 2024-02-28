import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Breadcrumb, Table, Space, Button, Input, Modal, Switch, Card, Divider, Tooltip } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import DashboardMenu from '../Dashboard/DashboardMenu'; 
import DashboardHeader from '../Dashboard/DashboardHeader'; 
import DashboardFooter from '../Dashboard/Footer';
import { Link } from 'react-router-dom';
import { getAllMethods } from '../../services/apiService'; // Assuming you have a service function to fetch methods

import './searchablePages.css'; // Import the CSS file

const { Header, Content } = Layout;
const { Search } = Input;
const { confirm } = Modal;

const Methods = () => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isCardView, setIsCardView] = useState(false);

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    try {
      const response = await getAllMethods(); // Assuming this function fetches methods from the API
      setMethods(response.methods);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching methods:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const handleCardClick = (methodId) => {
    // Redirect to method details page
    console.log('View method with ID:', methodId);
  };

  const handleDelete = (methodId) => {
    confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this method? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setMethods(methods.filter(method => method._id !== methodId));
      },
      onCancel() {
        console.log('Cancel delete');
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Tooltip title={text}>{text.length > 50 ? `${text.substring(0, 50)}...` : text}</Tooltip>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <Tooltip title={text}>{text.length > 100 ? `${text.substring(0, 100)}...` : text}</Tooltip>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/methods/${record._id}`}><Button type="primary" icon={<EyeOutlined />} size="small">View</Button></Link>
          <Link to={`/methods/${record._id}/edit`}><Button type="default" icon={<EditOutlined />} size="small">Edit</Button></Link>
          <Button type="danger" icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const filteredMethods = searchText
    ? methods.filter(method =>
        method.name.toLowerCase().includes(searchText) ||
        method.description.toLowerCase().includes(searchText)
      )
    : methods;

  return (
    <Layout className="page-layout">
      <DashboardMenu />
      <Layout className="site-layout">
        <DashboardHeader />
        <Content className="content-wrapper">
          <Breadcrumb className="breadcrumb-wrapper">
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Methods</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="page-title">Methods</h2>
            <Switch
              checkedChildren="Card View"
              unCheckedChildren="Table View"
              checked={isCardView}
              onChange={checked => setIsCardView(checked)}
            />
          </div>
          <Search
            placeholder="Search methods"
            allowClear
            enterButton={<Button type="default" icon={<SearchOutlined />} size="small">Search</Button>}
            size="large"
            onSearch={handleSearch}
            onChange={e => handleSearch(e.target.value)}
            className="search-bar"
          />
          {isCardView ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {filteredMethods.map(method => (
                <Card 
                  key={method._id}
                  className="custom-card"
                  onClick={() => handleCardClick(method._id)}
                >
                  {/* Method Details Section */}
                  <div className="card-header">
                    <Avatar size={24} icon={<InfoCircleOutlined />} style={{ marginRight: '8px' }} />
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'bold', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{method.name}</h3>
                  </div>
                  <Divider className="custom-divider" />
                  <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Description: {method.description}</p>
                  {/* Action Buttons Section */}
                  <div className="action-buttons">
                    <Space>
                      <Button type="danger" icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(method._id)}>Delete</Button>
                      <Button type="default" icon={<EditOutlined />} size="small">Edit</Button>
                    </Space>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Table dataSource={filteredMethods} columns={columns} loading={loading} />
          )}
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default Methods;
