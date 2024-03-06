import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  ExperimentOutlined,
  AreaChartOutlined,
  InfoCircleOutlined,
  SlidersOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  SearchOutlined,
  PieChartOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const DashboardMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getSelectedKey = () => {
    switch (currentPath) {
      case '/dashboard':
        return '1';
      case '/dashboard/projects':
        return '2';
      case '/dashboard/samples':
        return '3';
      case '/dashboard/annotations':
        return '4';
      case '/dashboard/methods':
        return '5';
      case '/dashboard/references':
        return '6';
      case '/dashboard/register-dataset':
        return '7';
      case '/dashboard/metadata-search':
        return '8';
      case '/dashboard/metadata-visualization':
        return '9';
      case '/dashboard/metadata-annotation-form':
        return '10';
      default:
        console.warn(`Unhandled path: ${currentPath}`);
        return '1';
    }
  };

  return (
    <Sider collapsible>
      <div className="logo" />
      <Menu theme="dark" selectedKeys={[getSelectedKey()]} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/dashboard">Home</Link>
        </Menu.Item>
        {/* Add additional menu items with appropriate keys and icons here, maintaining original code */}
        <Menu.Item key="2" icon={<ExperimentOutlined />}>
          <Link to="/dashboard/projects">Projects</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<AreaChartOutlined />}>
          <Link to="/dashboard/samples">Samples</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<InfoCircleOutlined />}>
          <Link to="/dashboard/annotations">Annotations</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<SlidersOutlined />}>
          <Link to="/dashboard/methods">Methods</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<BarChartOutlined />}>
          <Link to="/dashboard/references">References</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<DatabaseOutlined />}>
          <Link to="/dashboard/register-dataset">Register Dataset</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<SearchOutlined />}>
          <Link to="/dashboard/metadata-search">Metadata Search</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<PieChartOutlined />}>
          <Link to="/dashboard/metadata-visualization">Metadata Visualization</Link>
        </Menu.Item>
        <Menu.Item key="10" icon={<EditOutlined />}>
          <Link to="/dashboard/metadata-annotation-form">Metadata Annotation Form</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default DashboardMenu;