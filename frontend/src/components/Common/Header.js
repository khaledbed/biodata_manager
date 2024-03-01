import React from 'react';
import { Layout, Breadcrumb, Dropdown } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import NotificationMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';
import './Header.css';

const { Header } = Layout;

const DashboardHeader = () => {
  return (
    <Header className="dashboard-header">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div className="header-content">
        <NotificationMenu />
        <ProfileMenu />
      </div>
    </Header>
  );
};

export default DashboardHeader;
