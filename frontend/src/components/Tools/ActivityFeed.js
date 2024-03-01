import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Divider, Typography, Row, Col, Card, Button, Statistic, List, Avatar, Select, Input, Space } from 'antd';
import { ClockCircleOutlined, SearchOutlined } from '@ant-design/icons';

import DashboardMenu from '../Common/SideMenu'; 
import DashboardFooter from '../Common/Footer';
import DashboardHeader from '../Common/Header';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const ActivityFeed = () => {
  const [filteredActivities, setFilteredActivities] = useState(activities);

  // Handler for filtering activities
  const handleFilterChange = (filter) => {
    if (filter === 'all') {
      setFilteredActivities(activities);
    } else {
      const filtered = activities.filter(activity => activity.type === filter);
      setFilteredActivities(filtered);
    }
  };

  // Handler for searching activities
  const handleSearch = (value) => {
    const searchResult = activities.filter(activity =>
      activity.title.toLowerCase().includes(value.toLowerCase()) ||
      activity.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredActivities(searchResult);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DashboardMenu />
      <Layout className="site-layout">
        <DashboardHeader />
        <Content style={{ backgroundColor: '#f0f2f5', padding: 0, overflow: 'initial' }}>
          <Breadcrumb style={{ marginBottom: '24px', padding: '16px 24px' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Activity Feed</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background dashboard-content" style={{ padding: '24px', minHeight: 'calc(100vh - 48px)', overflow: 'initial' }}>
            <Title level={3}>Activity Feed</Title>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Select defaultValue="all" onChange={handleFilterChange}>
                  <Option value="all">All</Option>
                  <Option value="project">Project</Option>
                  <Option value="dataset">Dataset</Option>
                  <Option value="annotation">Annotation</Option>
                  <Option value="reference">Reference</Option>
                  <Option value="sample">Sample</Option>
                  <Option value="settings">Settings</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="user">User</Option>
                </Select>
                <Search
                  placeholder="Search activities"
                  onSearch={handleSearch}
                  style={{ width: 200 }}
                  enterButton={<Button icon={<SearchOutlined />} />}
                />
              </Space>
            </div>
            <List
              itemLayout="horizontal"
              dataSource={filteredActivities}
              pagination={{ pageSize: 5 }}
              renderItem={(item) => (
                <>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<ClockCircleOutlined />} />}
                      title={<Text strong>{item.title}</Text>}
                      description={item.description}
                    />
                    <Text type="secondary">{item.timestamp}</Text>
                  </List.Item>
                  <Divider style={{ margin: '8px 0', borderColor: '#f0f0f0' }} />
                </>
              )}
            />
          </div>
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
};

export default ActivityFeed;

const activities = [
  {
    title: 'User John Doe updated profile information',
    description: 'John Doe updated his profile information including email address and phone number.',
    type: 'user',
    timestamp: '2024-03-01 09:30 AM',
  },
  {
    title: 'Admin modified project settings',
    description: 'Admin changed the project settings, including permissions and access control.',
    type: 'admin',
    timestamp: '2024-03-01 10:15 AM',
  },
  {
    title: 'Settings updated: Dark mode enabled',
    description: 'Dark mode has been enabled in the application settings.',
    type: 'settings',
    timestamp: '2024-03-01 11:00 AM',
  },
  // Add more example activities here...
];
