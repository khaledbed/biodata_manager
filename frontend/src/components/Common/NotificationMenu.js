import React, { useState } from 'react';
import { Menu, Dropdown, Badge, Typography, Divider } from 'antd';
import { BellOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const NotificationMenu = () => {
  const [notificationCount, setNotificationCount] = useState(3);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const toggleNotification = () => {
    setNotificationVisible(!notificationVisible);
    // Reset notification count when the menu is opened
    if (notificationVisible) {
      setNotificationCount(0);
    }
  };

  const handleNotificationMenuClick = ({ key }) => {
    // Handle notification menu item clicks here
    console.log('Clicked on notification menu item:', key);
    // Close the notification menu after clicking
    setNotificationVisible(false);
  };

  const notificationMenu = (
    <Menu onClick={handleNotificationMenuClick} className="dashboard-menu notification-menu">
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
      <Divider style={{ margin: '8px 0', borderColor: '#f0f0f0' }} />
      <Menu.Item key="4" className="view-all" style={{ padding: '12px 16px', textAlign: 'center', color: '#1890FF' }}>
        <a href="#">View All Notifications</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={notificationMenu} trigger={['click']} visible={notificationVisible} onVisibleChange={toggleNotification} placement="bottomCenter">
      <div className="dashboard-menu notification">
        <Badge count={notificationCount} overflowCount={99} style={{ marginTop: -6, marginLeft: 6 }}>
          <BellOutlined className="bell-icon" />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default NotificationMenu;
