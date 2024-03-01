import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Table, Space, Button, Tag, Input, Card, Switch, Tooltip, Avatar, Divider, Modal } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import DashboardMenu from '../Common/SideMenu'; 
import DashboardHeader from '../Common/Header'; 
import DashboardFooter from '../Common/Footer';
import { Link } from 'react-router-dom';
import { getAllDatasets } from '../../services/apiService';

import './searchablePages.css'; 

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { confirm } = Modal;

const Datasets = () => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isCardView, setIsCardView] = useState(false);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    try {
      const response = await getAllDatasets();
      setDatasets(response.datasets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching datasets:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const filteredDatasets = searchText
    ? datasets.filter(dataset =>
        Object.values(dataset).some(value => {
          if (Array.isArray(value)) {
            return value.some(item => {
              if (typeof item === 'string') {
                return item.toLowerCase().includes(searchText);
              }
              return false;
            });
          }
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchText);
          }
          return false;
        })
      )
    : datasets;

  const handleDelete = (datasetId) => {
    confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this dataset? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setDatasets(datasets.filter(dataset => dataset.id !== datasetId));
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

  const handleCardClick = (datasetId) => {
    // Redirect to dataset details page
    console.log('View dataset with ID:', datasetId);
  };

  const columns = [
    {
      title: 'Dataset Name',
      dataIndex: 'dataset_name',
      key: 'dataset_name',
      sorter: (a, b) => a.dataset_name.localeCompare(b.dataset_name),
    },
    {
      title: 'Description',
      dataIndex: 'dataset_description',
      key: 'dataset_description',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: renderTags,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/datasets/${record.id}`}><Button type="primary" icon={<EyeOutlined />} size="small">View</Button></Link>
          <Link to={`/datasets/${record.id}/edit`}><Button type="default" icon={<EditOutlined />} size="small">Edit</Button></Link>
          <Button type="danger" icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record.id)}>Delete</Button>
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
            <Breadcrumb.Item>Datasets</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="page-title">Datasets</h2>
            <Switch
              checkedChildren="Card View"
              unCheckedChildren="Table View"
              checked={isCardView}
              onChange={checked => setIsCardView(checked)}
            />
          </div>
          <Search
            placeholder="Search datasets"
            allowClear
            enterButton={<Button type="default" icon={<SearchOutlined />} size="small">Search</Button>}
            size="large"
            onSearch={handleSearch}
            onChange={e => handleSearch(e.target.value)}
            className="search-bar"
          />
          {isCardView ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {filteredDatasets.map(dataset => (
                <Card 
                  key={dataset.id} 
                  className="custom-card"
                  onClick={() => handleCardClick(dataset.id)}
                >
                  {/* Header Section */}
                  <div className="card-header">
                    <Avatar size={24} icon={<UserOutlined />} style={{ marginRight: '8px' }} />
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'bold', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dataset.dataset_name}</h3>
                  </div>
                  <Divider className="custom-divider" />
                  <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>{dataset.dataset_description.length > 150 ? dataset.dataset_description.substring(0, 150) + '...' : dataset.dataset_description}</p>
                  
                  {/* Tags Section */}
                  <div style={{ marginBottom: '16px' }}>
                    <strong style={{ fontSize: '14px', color: '#666' }}>Tags:</strong> {renderTags(dataset.tags.slice(0, 3))}
                    {dataset.tags.length > 3 && (
                      <Tooltip title="View All Tags">
                        <InfoCircleOutlined />
                      </Tooltip>
                    )}
                  </div>
                  
                  {/* Action Buttons Section */}
                  <div className="action-buttons">
                    <Space>
                      <Button type="danger" icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(dataset.id)}>Delete</Button>
                      <Button type="default" icon={<EditOutlined />} size="small">Edit</Button>
                    </Space>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Table dataSource={filteredDatasets} columns={columns} loading={loading} />
          )}
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default Datasets;
