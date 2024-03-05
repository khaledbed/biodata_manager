import React, { useState } from 'react';
import { Avatar, Menu, Dropdown, Typography } from 'antd';
import { UserOutlined, BellOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const NotificationMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuClick = (e) => {
    // Handle menu item clicks here
    console.log('Notification menu item clicked:', e.key);
    // Close the menu after clicking
    setMenuVisible(false);
  };

  const notificationMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<ExclamationCircleOutlined style={{ color: '#FF4D4F' }} />}>
        <Text strong>New data entry added</Text>
        <Text type="secondary" style={{ fontSize: '12px' }}>2 minutes ago</Text>
      </Menu.Item>
      <Menu.Item key="2" icon={<ExclamationCircleOutlined style={{ color: '#FAAD14' }} />}>
        <Text strong>New annotation created</Text>
        <Text type="secondary" style={{ fontSize: '12px' }}>1 hour ago</Text>
      </Menu.Item>
      <Menu.Item key="3" icon={<ExclamationCircleOutlined style={{ color: '#1890FF' }} />}>
        <Text strong>Method updated</Text>
        <Text type="secondary" style={{ fontSize: '12px' }}>Yesterday</Text>
      </Menu.Item>
      <Menu.Item key="4" className="view-all" style={{ padding: '12px 16px', textAlign: 'center', color: '#1890FF' }}>
        <Link to="/notifications">View All Notifications</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={notificationMenu} trigger={['click']} open={menuVisible} onVisibleChange={toggleMenu} placement="bottomRight">
      <div className="notification-menu">
        <BellOutlined style={{ fontSize: '20px', color: '#1890FF', cursor: 'pointer' }} />
      </div>
    </Dropdown>
  );
};

export default NotificationMenu;
