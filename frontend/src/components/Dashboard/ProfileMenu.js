import React, { useState } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined, ProfileOutlined } from '@ant-design/icons';

const ProfileMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      // Handle logout action
      console.log('Logout clicked');
    }
    // Close the menu after clicking
    setMenuVisible(false);
  };

  const menu = (
    <Menu className="dashboard-menu profile-menu" onClick={handleMenuClick}>
      <div className="profile-section">
        <Avatar size={64} icon={<UserOutlined />} />
        <div className="profile-info">
          <p className="username">John Doe</p>
          <p className="email">john.doe@example.com</p>
        </div>
      </div>
      <Menu.Divider />
      <Menu.Item key="profile">
        <ProfileOutlined />
        <span>Profile</span>
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        <span>Settings</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" danger icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} visible={menuVisible} onVisibleChange={toggleMenu} placement="bottomRight">
      <div className="dashboard-menu profile-dropmenu">
        <Avatar size={36} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
      </div>
    </Dropdown>
  );
};

export default ProfileMenu;
