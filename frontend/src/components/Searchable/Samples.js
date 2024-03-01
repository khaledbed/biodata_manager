import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Table, Space, Button, Tag, Input, Card, Switch, Tooltip, Avatar, Divider, Modal } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined, UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import DashboardMenu from '../Common/SideMenu'; 
import DashboardHeader from '../Common/Header'; 
import DashboardFooter from '../Common/Footer';
import { Link } from 'react-router-dom';
import { getAllSamples } from '../../services/apiService'; // Assuming you have a service function to fetch samples

import './searchablePages.css'; // Import the CSS file

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { confirm } = Modal;

const Samples = () => {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isCardView, setIsCardView] = useState(false);

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      const response = await getAllSamples(); // Assuming this function fetches samples from the API
      setSamples(response.samples);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching samples:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const filteredSamples = searchText
    ? samples.filter(sample =>
        Object.values(sample).some(value => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchText);
          } else if (typeof value === 'object') {
            return Object.values(value).some(v => typeof v === 'string' && v.toLowerCase().includes(searchText));
          }
          return false;
        })
      )
    : samples;

  const handleDelete = (sampleId) => {
    confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this sample? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setSamples(samples.filter(sample => sample._id !== sampleId));
      },
      onCancel() {
        console.log('Cancel delete');
      },
    });
  };

  const renderTags = (tags) => (
    <Space size="small">
      {tags.map(tag => (
        <Tag key={tag} style={{ background: '#f0f2f5', color: '#666', border: '1px solid #d9d9d9' }}>{tag}</Tag>
      ))}
    </Space>
  );

  const renderKeyValuePairs = (data) => (
    <div style={{ marginBottom: '16px' }}>
      {Object.entries(data).map(([key, value]) => (
        <p key={key} style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>
          <strong>{key}:</strong> {value}
        </p>
      ))}
    </div>
  );

  const handleCardClick = (sampleId) => {
    // Redirect to sample details page
    console.log('View sample with ID:', sampleId);
  };

  const columns = [
    {
      title: 'Sample Name',
      dataIndex: 'sample_name',
      key: 'sample_name',
      sorter: (a, b) => a.sample_name.localeCompare(b.sample_name),
    },
    {
      title: 'Sample Type',
      dataIndex: 'sample_type',
      key: 'sample_type',
    },
    {
      title: 'Metadata',
      dataIndex: 'metadata',
      key: 'metadata',
      render: (metadata) => renderKeyValuePairs(metadata),
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      render: (data) => renderKeyValuePairs(data),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/samples/${record._id}`}><Button type="primary" icon={<EyeOutlined />} size="small">View</Button></Link>
          <Link to={`/samples/${record._id}/edit`}><Button type="default" icon={<EditOutlined />} size="small">Edit</Button></Link>
          <Button type="danger" icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout className="page-layout">
      <DashboardMenu />
      <Layout className="site-layout">
        <DashboardHeader />
        <Content className="content-wrapper">
          <Breadcrumb className="breadcrumb-wrapper">
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Samples</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="page-title">Samples</h2>
            <Switch
              checkedChildren="Card View"
              unCheckedChildren="Table View"
              checked={isCardView}
              onChange={checked => setIsCardView(checked)}
            />
          </div>
          <Search
            placeholder="Search samples"
            allowClear
            enterButton={<Button type="default" icon={<SearchOutlined />} size="small">Search</Button>}
            size="large"
            onSearch={handleSearch}
            onChange={e => handleSearch(e.target.value)}
            className="search-bar"
          />
          {isCardView ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {filteredSamples.map(sample => (
                <Card 
                  key={sample._id}
                  className="custom-card"
                  onClick={() => handleCardClick(sample._id)}
                >
                  {/* Sample Details Section */}
                  <div className="card-header">
                    <Avatar size={24} icon={<UserOutlined />} style={{ marginRight: '8px' }} />
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'bold', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sample.sample_name}</h3>
                  </div>
                  <Divider className="custom-divider" />
                  <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Sample Type: {sample.sample_type}</p>
                  <Divider className="custom-divider" />
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Metadata</h4>
                  {renderKeyValuePairs(sample.metadata)}
                  <Divider className="custom-divider" />
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Data</h4>
                  {renderKeyValuePairs(sample.data)}
                  {/* Action Buttons Section */}
                  <div className="action-buttons">
                    <Space>
                      <Button type="danger" icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(sample._id)}>Delete</Button>
                      <Button type="default" icon={<EditOutlined />} size="small">Edit</Button>
                    </Space>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Table dataSource={filteredSamples} columns={columns} loading={loading} />
          )}
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default Samples;
