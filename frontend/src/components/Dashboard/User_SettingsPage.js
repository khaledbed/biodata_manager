import React from 'react';
import { Card, Tabs } from 'antd';
import UserSettingsTab from './UserSettingsTab';
import GroupSettingsTab from './GroupSettingsTab';

const { TabPane } = Tabs;

const UserManagementPage = () => {
  return (
    <Card className="user-settings-card" bordered={false}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="User Management" key="1">
          <UserSettingsTab />
        </TabPane>
        <TabPane tab="Group Management" key="2">
          <GroupSettingsTab />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default UserManagementPage;
