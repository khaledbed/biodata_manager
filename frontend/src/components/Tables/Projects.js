import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Table, Space, Button, Tag, Input, Card } from 'antd';
import DashboardMenu from '../Common/SideMenu'; 
import { Link } from 'react-router-dom';
import { getAllProjects } from '../../services/apiService';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

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
    setSearchText(value.toLowerCase()); // Convert search text to lowercase for case-insensitive search
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

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'project_name',
      sorter: (a, b) => a.project_name.localeCompare(b.project_name), // Enable sorting
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
      render: methods => (
        <Space size="middle">
          {methods.map(method => (
            <Tag key={method}>{method}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Samples',
      dataIndex: 'samples',
      key: 'samples',
      render: samples => (
        <Space size="middle">
          {samples.map(sample => (
            <Tag key={sample}>{sample}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" size="small"><Link to={`/projects/${record.id}`}>View</Link></Button>
          <Button type="default" size="small"><Link to={`/projects/${record.id}/edit`}>Edit</Link></Button>
          <Button type="danger" size="small" onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (projectId) => {
    // Implement delete functionality here
    console.log('Delete project with ID:', projectId);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardMenu />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Projects</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content">
            <h2>Projects</h2>
            <Search
              placeholder="Search projects"
              allowClear
              enterButton
              size="large"
              onSearch={handleSearch}
              onChange={e => handleSearch(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            <Space direction="vertical" style={{ width: '100%' }}>
              {filteredProjects.map(project => (
                <Card key={project.id}>
                  <h3>{project.project_name}</h3>
                  <p>{project.project_description}</p>
                  <Space>
                    <strong>Methods Used:</strong>
                    {project.methods_used.map(method => (
                      <Tag key={method}>{method}</Tag>
                    ))}
                  </Space>
                  <Space>
                    <strong>Samples:</strong>
                    {project.samples.map(sample => (
                      <Tag key={sample}>{sample}</Tag>
                    ))}
                  </Space>
                  <div>
                    <Button type="primary" size="small"><Link to={`/projects/${project.id}`}>View</Link></Button>
                    <Button type="default" size="small"><Link to={`/projects/${project.id}/edit`}>Edit</Link></Button>
                    <Button type="danger" size="small" onClick={() => handleDelete(project.id)}>Delete</Button>
                  </div>
                </Card>
              ))}
            </Space>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>BiodAta manAger  ©2024 Created by MBD Team</Footer>
      </Layout>
    </Layout>
  );
};

export default Projects;
