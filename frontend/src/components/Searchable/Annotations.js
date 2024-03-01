import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Breadcrumb, Table, Space, Button, Input, Modal, Switch, Card, Divider, Tooltip } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import DashboardMenu from '../Common/SideMenu'; 
import DashboardHeader from '../Common/Header'; 
import DashboardFooter from '../Common/Footer';
import { Link } from 'react-router-dom';
import { getAllAnnotations } from '../../services/apiService'; // Assuming you have a service function to fetch annotations

import './searchablePages.css'; // Import the CSS file

const { Header, Content } = Layout;
const { Search } = Input;
const { confirm } = Modal;

const Annotations = () => {
  const [annotations, setAnnotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isCardView, setIsCardView] = useState(false);

  useEffect(() => {
    fetchAnnotations();
  }, []);

  const fetchAnnotations = async () => {
    try {
      const response = await getAllAnnotations(); // Assuming this function fetches annotations from the API
      setAnnotations(response.annotations);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching annotations:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const handleCardClick = (annotationId) => {
    // Redirect to annotation details page
    console.log('View annotation with ID:', annotationId);
  };

  const handleDelete = (annotationId) => {
    confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this annotation? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setAnnotations(annotations.filter(annotation => annotation._id !== annotationId));
      },
      onCancel() {
        console.log('Cancel delete');
      },
    });
  };

  const columns = [
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (text) => <Tooltip title={text}>{text.length > 100 ? `${text.substring(0, 100)}...` : text}</Tooltip>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/annotations/${record._id}`}><Button type="primary" icon={<EyeOutlined />} size="small">View</Button></Link>
          <Link to={`/annotations/${record._id}/edit`}><Button type="default" icon={<EditOutlined />} size="small">Edit</Button></Link>
          <Button type="danger" icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const filteredAnnotations = searchText
    ? annotations.filter(annotation =>
        annotation.content.toLowerCase().includes(searchText)
      )
    : annotations;

  return (
    <Layout className="page-layout">
      <DashboardMenu />
      <Layout className="site-layout">
        <DashboardHeader />
        <Content className="content-wrapper">
          <Breadcrumb className="breadcrumb-wrapper">
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Annotations</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="page-title">Annotations</h2>
            <Switch
              checkedChildren="Card View"
              unCheckedChildren="Table View"
              checked={isCardView}
              onChange={checked => setIsCardView(checked)}
            />
          </div>
          <Search
            placeholder="Search annotations"
            allowClear
            enterButton={<Button type="default" icon={<SearchOutlined />} size="small">Search</Button>}
            size="large"
            onSearch={handleSearch}
            onChange={e => handleSearch(e.target.value)}
            className="search-bar"
          />
          {isCardView ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {filteredAnnotations.map(annotation => (
                <Card 
                  key={annotation._id}
                  className="custom-card"
                  onClick={() => handleCardClick(annotation._id)}
                >
                  {/* Annotation Details Section */}
                  <div className="card-header">
                    <Avatar size={24} icon={<InfoCircleOutlined />} style={{ marginRight: '8px' }} />
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'bold', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Annotation</h3>
                  </div>
                  <Divider className="custom-divider" />
                  <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Content: {annotation.content}</p>
                  {/* Action Buttons Section */}
                  <div className="action-buttons">
                    <Space>
                      <Button type="danger" icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(annotation._id)}>Delete</Button>
                      <Button type="default" icon={<EditOutlined />} size="small">Edit</Button>
                    </Space>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Table dataSource={filteredAnnotations} columns={columns} loading={loading} />
          )}
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default Annotations;
