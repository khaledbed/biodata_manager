import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Table, Space, Button, Tag, Input, Card, Switch, Tooltip, Avatar, Divider, Modal } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined, UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import DashboardMenu from '../Common/SideMenu'; 
import DashboardHeader from '../Common/Header'; 
import DashboardFooter from '../Common/Footer';
import { Link } from 'react-router-dom';
import { getAllProjects } from '../../services/apiService';

import './searchablePages.css'; // Import the CSS file

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { confirm } = Modal;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isCardView, setIsCardView] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response.projects);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const filteredProjects = searchText
    ? projects.filter(project =>
        Object.values(project).some(value => {
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
    : projects;

  const handleDelete = (projectId) => {
    confirm({
      title: 'Confirm Deletion',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this project? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setProjects(projects.filter(project => project.id !== projectId));
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

  const handleCardClick = (projectId) => {
    // Redirect to project details page
    console.log('View project with ID:', projectId);
  };

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'project_name',
      sorter: (a, b) => a.project_name.localeCompare(b.project_name),
    },
    {
      title: 'Description',
      dataIndex: 'project_description',
      key: 'project_description',
    },
    {
      title: 'Methods Used',
      dataIndex: 'methods_used',
      key: 'methods_used',
      render: renderTags,
    },
    {
      title: 'Samples',
      dataIndex: 'samples',
      key: 'samples',
      render: renderTags,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/projects/${record.id}`}><Button type="primary" icon={<EyeOutlined />} size="small">View</Button></Link>
          <Link to={`/projects/${record.id}/edit`}><Button type="default" icon={<EditOutlined />} size="small">Edit</Button></Link>
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
            <Breadcrumb.Item>Projects</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="page-title">Projects</h2>
            <Switch
              checkedChildren="Card View"
              unCheckedChildren="Table View"
              checked={isCardView}
              onChange={checked => setIsCardView(checked)}
            />
          </div>
          <Search
            placeholder="Search projects"
            allowClear
            enterButton={<Button type="default" icon={<SearchOutlined />} size="small">Search</Button>}
            size="large"
            onSearch={handleSearch}
            onChange={e => handleSearch(e.target.value)}
            className="search-bar"
          />
          {isCardView ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {filteredProjects.map(project => (
                <Card 
                  key={project.id} 
                  className="custom-card"
                  onClick={() => handleCardClick(project.id)}
                >
                  {/* Header Section */}
                  <div className="card-header">
                    <Avatar size={24} icon={<UserOutlined />} style={{ marginRight: '8px' }} />
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'bold', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.project_name}</h3>
                  </div>
                  <Divider className="custom-divider" />
                  <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>{project.project_description.length > 150 ? project.project_description.substring(0, 150) + '...' : project.project_description}</p>
                  
                  {/* Details Section */}
                  <div style={{ marginBottom: '16px' }}>
                    <strong style={{ fontSize: '14px', color: '#666' }}>Methods Used:</strong> {renderTags(project.methods_used.slice(0, 3))}
                    {project.methods_used.length > 3 && (
                      <Tooltip title="View All Methods">
                        <InfoCircleOutlined />
                      </Tooltip>
                    )}
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <strong style={{ fontSize: '14px', color: '#666' }}>Samples:</strong> {renderTags(project.samples.slice(0, 3))}
                    {project.samples.length > 3 && (
                      <Tooltip title="View All Samples">
                        <InfoCircleOutlined />
                      </Tooltip>
                    )}
                  </div>
                  
                  {/* Action Buttons Section */}
                  <div className="action-buttons">
                    <Space>
                      <Button type="danger" icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(project.id)}>Delete</Button>
                      <Button type="default" icon={<EditOutlined />} size="small">Edit</Button>
                    </Space>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Table dataSource={filteredProjects} columns={columns} loading={loading} />
          )}
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default Projects;
