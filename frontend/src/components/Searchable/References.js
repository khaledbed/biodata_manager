import React, { useState, useEffect } from 'react';
import { Layout, Tag, Breadcrumb, Table, Space, Button, Input, Modal, Switch, Card, Avatar, Divider, Tooltip } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import DashboardMenu from '../Dashboard/DashboardMenu'; 
import DashboardHeader from '../Dashboard/DashboardHeader'; 
import DashboardFooter from '../Dashboard/Footer';
import { Link } from 'react-router-dom';
import { getAllReferences } from '../../services/apiService'; // Assuming you have a service function to fetch references

import './searchablePages.css'; // Import the CSS file

const { Header, Content } = Layout;
const { Search } = Input;
const { confirm } = Modal;

const References = () => {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isCardView, setIsCardView] = useState(false);

  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    try {
      const response = await getAllReferences(); // Assuming this function fetches references from the API
      setReferences(response.references);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching references:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const handleCardClick = (referenceId) => {
    // Redirect to reference details page
    console.log('View reference with ID:', referenceId);
  };

  const handleDelete = (referenceId) => {
    confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this reference? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setReferences(references.filter(reference => reference._id !== referenceId));
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

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <Tooltip title={text}>{text.length > 50 ? `${text.substring(0, 50)}...` : text}</Tooltip>,
    },
    {
      title: 'Authors',
      dataIndex: 'authors',
      key: 'authors',
      render: (text) => <Tooltip title={text}>{text.length > 20 ? `${text.substring(0, 20)}...` : text}</Tooltip>,
    },
    {
      title: 'Journal',
      dataIndex: 'journal',
      key: 'journal',
      render: (text) => <Tooltip title={text}>{text.length > 30 ? `${text.substring(0, 30)}...` : text}</Tooltip>,
    },
    {
      title: 'Year',
      dataIndex: 'pub_year',
      key: 'pub_year',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/references/${record._id}`}><Button type="primary" icon={<EyeOutlined />} size="small">View</Button></Link>
          <Link to={`/references/${record._id}/edit`}><Button type="default" icon={<EditOutlined />} size="small">Edit</Button></Link>
          <Button type="danger" icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const filteredReferences = searchText
    ? references.filter(reference =>
        reference.title.toLowerCase().includes(searchText) ||
        reference.authors.toLowerCase().includes(searchText) ||
        reference.journal.toLowerCase().includes(searchText) ||
        reference.pub_year.toString().includes(searchText)
      )
    : references;

  return (
    <Layout className="page-layout">
      <DashboardMenu />
      <Layout className="site-layout">
        <DashboardHeader />
        <Content className="content-wrapper">
          <Breadcrumb className="breadcrumb-wrapper">
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>References</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="page-title">References</h2>
            <Switch
              checkedChildren="Card View"
              unCheckedChildren="Table View"
              checked={isCardView}
              onChange={checked => setIsCardView(checked)}
            />
          </div>
          <Search
            placeholder="Search references"
            allowClear
            enterButton={<Button type="default" icon={<SearchOutlined />} size="small">Search</Button>}
            size="large"
            onSearch={handleSearch}
            onChange={e => handleSearch(e.target.value)}
            className="search-bar"
          />
          {isCardView ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {filteredReferences.map(reference => (
                <Card 
                  key={reference._id}
                  className="custom-card"
                  onClick={() => handleCardClick(reference._id)}
                >
                  {/* Reference Details Section */}
                  <div className="card-header">
                    <Avatar size={24} icon={<InfoCircleOutlined />} style={{ marginRight: '8px' }} />
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'bold', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{reference.title}</h3>
                  </div>
                  <Divider className="custom-divider" />
                  <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Authors: {reference.authors}</p>
                  <Divider className="custom-divider" />
                  <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Journal: {reference.journal}</p>
                  <Divider className="custom-divider" />
                  <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Year: {reference.pub_year}</p>
                  {/* Action Buttons Section */}
                  <div className="action-buttons">
                    <Space>
                      <Button type="danger" icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(reference._id)}>Delete</Button>
                      <Button type="default" icon={<EditOutlined />} size="small">Edit</Button>
                    </Space>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Table dataSource={filteredReferences} columns={columns} loading={loading} />
          )}
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default References;
