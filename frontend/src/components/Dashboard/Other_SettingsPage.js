import React from 'react';
import { Card, Button, Form, Input, Checkbox, Select, Divider, Tabs, Radio, Slider, Switch, DatePicker } from 'antd';

const { Option } = Select;
const { TabPane } = Tabs;

const OtherSettingsPage = ({ onFinish }) => {
  return (
    <Card title="Other Settings">
      <Tabs defaultActiveKey="notifications">
        <TabPane tab="Notifications" key="notifications">
          <Form name="notification-settings" onFinish={onFinish} layout="vertical">
            <Form.Item name="emailNotifications" label="Email Notifications" valuePropName="checked">
              <Checkbox>Receive email notifications</Checkbox>
            </Form.Item>
            <Form.Item name="smsNotifications" label="SMS Notifications" valuePropName="checked">
              <Checkbox>Receive SMS notifications</Checkbox>
            </Form.Item>
            <Form.Item name="notificationSound" label="Notification Sound" valuePropName="checked">
              <Checkbox>Play sound for notifications</Checkbox>
            </Form.Item>
            <Divider orientation="left">Notification Preferences</Divider>
            <Form.Item name="emailFrequency" label="Email Frequency">
              <Radio.Group>
                <Radio value="daily">Daily</Radio>
                <Radio value="weekly">Weekly</Radio>
                <Radio value="monthly">Monthly</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Language" key="language">
          <Form name="language-settings" onFinish={onFinish} layout="vertical">
            <Form.Item name="language" label="Language" initialValue="en">
              <Select>
                <Option value="en">English</Option>
                <Option value="fr">French</Option>
                <Option value="es">Spanish</Option>
              </Select>
            </Form.Item>
            <Form.Item name="region" label="Region" initialValue="us">
              <Select>
                <Option value="us">United States</Option>
                <Option value="uk">United Kingdom</Option>
                <Option value="ca">Canada</Option>
              </Select>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Integration" key="integration">
          <Form name="integration-settings" onFinish={onFinish} layout="vertical">
            <Form.Item name="googleCalendarSync" label="Google Calendar Sync" valuePropName="checked">
              <Checkbox>Sync with Google Calendar</Checkbox>
            </Form.Item>
            <Form.Item name="dropboxIntegration" label="Dropbox Integration" valuePropName="checked">
              <Checkbox>Enable Dropbox integration</Checkbox>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Advanced" key="advanced">
          <Form name="advanced-settings" onFinish={onFinish} layout="vertical">
            <Form.Item name="developerMode" label="Developer Mode" valuePropName="checked">
              <Checkbox>Enable developer mode</Checkbox>
            </Form.Item>
            <Form.Item name="debugMode" label="Debug Mode" valuePropName="checked">
              <Checkbox>Enable debug mode</Checkbox>
            </Form.Item>
            <Form.Item name="dataEncryption" label="Data Encryption" valuePropName="checked">
              <Checkbox>Enable data encryption</Checkbox>
            </Form.Item>
            <Form.Item name="backupSettings" label="Backup Settings" valuePropName="checked">
              <Checkbox>Enable automatic backups</Checkbox>
            </Form.Item>
            <Form.Item name="autoLogout" label="Auto Logout">
              <Slider defaultValue={15} min={5} max={60} step={5} />
            </Form.Item>
            <Form.Item name="darkMode" label="Dark Mode" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="lastBackup" label="Last Backup">
              <DatePicker />
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
      {/* Submit button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">Save Other Settings</Button>
      </Form.Item>
    </Card>
  );
};

export default OtherSettingsPage;
