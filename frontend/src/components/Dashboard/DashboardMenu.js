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
  FormOutlined // Import the FormOutlined icon
} from '@ant-design/icons';

const { Sider } = Layout;

const DashboardMenu = () => {
  // Get the current location using useLocation hook
  const location = useLocation();

  // Get the path from the location object
  const currentPath = location.pathname;

  // Function to get the default selected key based on the current path
  const getDefaultSelectedKey = () => {
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
      case '/dashboard/register-dataset': // Add the path for RegisterDatasetForm
        return '7';
      case '/dashboard/metadata-search': // Add the path for MetadataSearch
        return '8';
      case '/dashboard/metadata-visualization': // Add the path for MetadataVisualization
        return '9';
      case '/dashboard/metadata-annotation-form': // Add the path for MetadataAnnotationForm
        return '10';
      default:
        return '1'; // Default to Home if path does not match
    }
  };

  return (
    <Sider collapsible>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={[getDefaultSelectedKey()]} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/dashboard">Home</Link>
        </Menu.Item>
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
        <Menu.Item key="7" icon={<FormOutlined />}>
          <Link to="/dashboard/register-dataset">Register Dataset</Link> {/* Add menu item for RegisterDatasetForm */}
        </Menu.Item>
        <Menu.Item key="8" icon={<FormOutlined />}>
          <Link to="/dashboard/metadata-search">Metadata Search</Link> {/* Add menu item for MetadataSearch */}
        </Menu.Item>
        <Menu.Item key="9" icon={<FormOutlined />}>
          <Link to="/dashboard/metadata-visualization">Metadata Visualization</Link> {/* Add menu item for MetadataVisualization */}
        </Menu.Item>
        <Menu.Item key="10" icon={<FormOutlined />}>
          <Link to="/dashboard/metadata-annotation-form">Metadata Annotation Form</Link> {/* Add menu item for MetadataAnnotationForm */}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default DashboardMenu;
