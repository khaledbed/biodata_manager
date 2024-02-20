import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Row, Col, Statistic, Divider, Typography, Table, Space, Button, Tooltip, Progress, Tag } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import DashboardMenu from './DashboardMenu'; 
import { PlusOutlined } from '@ant-design/icons';

import Counts from './Counts';
import Projects from './Projects';
import Samples from './Samples';
import './Dashboard.css';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  // Dummy data for the table
  const dataSource = [
    {
      key: '1',
      name: 'John Doe',
      age: 32,
      email: 'john@example.com',
    },
    {
      key: '2',
      name: 'Jane Smith',
      age: 28,
      email: 'jane@example.com',
    },
  ];

  // Columns configuration for the table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card>
                  <Statistic title="Total Data Entries" value={1058} />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic title="Total Annotations" value={56} />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic title="Total Methods" value={8} />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic title="Total References" value={256} />
                </Card>
              </Col>
            </Row>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col span={16}>
                <Title level={3}>Recent Data Entries</Title>
                <Table dataSource={dataSource} columns={columns} />
                <Button type="primary" icon={<PlusOutlined />}>Add Data</Button>
              </Col>
              <Col span={8}>
                <Title level={3}>Data Distribution</Title>
                {/* Placeholder for chart or other data visualization component */}
                <Text type="secondary">Chart or visualization goes here</Text>
              </Col>
            </Row>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Title level={3}>Notifications</Title>
                <Card>
                  <p>You have 3 new notifications</p>
                  <ul>
                    <li>New data entry added</li>
                    <li>New annotation created</li>
                    <li>Method updated</li>
                  </ul>
                  <Button type="primary">View All</Button>
                </Card>
              </Col>
              <Col span={12}>
                <Title level={3}>Quick Links</Title>
                <Card>
                  <ul>
                    <li>
                      <Link to="/dashboard/data">View Data</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/projects">Manage Projects</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/samples">Browse Samples</Link>
                    </li>
                  </ul>
                </Card>
              </Col>
            </Row>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Title level={3}>Data Quality Metrics</Title>
                <Card>
                  <Text>Data Accuracy:</Text>
                  <Progress percent={65} status="exception" />
                  <Text>Data Consistency:</Text>
                  <Progress percent={90} />
                </Card>
              </Col>
              <Col span={12}>
                <Title level={3}>System Health</Title>
                <Card>
                  <Space direction="vertical">
                    <Text>Database Status:</Text>
                    <Tag color="green">Online</Tag>
                    <Text>Server Load:</Text>
                    <Progress percent={50} />
                    <Text>CPU Usage:</Text>
                    <Progress percent={70} />
                    <Text>Memory Usage:</Text>
                    <Progress percent={40} />
                  </Space>
                </Card>
              </Col>
            </Row>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Title level={3}>Tags</Title>
                <Card>
                  <Space>
                    <Tag color="blue">Biology</Tag>
                    <Tag color="green">Genetics</Tag>
                    <Tag color="cyan">Sequencing</Tag>
                    <Tag color="magenta">Bioinformatics</Tag>
                    <Tag color="geekblue">Data Analysis</Tag>
                    <Tag color="purple">Machine Learning</Tag>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design Dashboard ©2024 Created by MBD Team</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
