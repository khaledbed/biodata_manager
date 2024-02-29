import React from 'react';
import { Card, Button, Form, Input, Select, Typography, Tabs, Switch } from 'antd';

const { Option } = Select;
const { Title } = Typography;
const { TabPane } = Tabs;

const UISettingsPage = ({ onFinish }) => {
  return (
    <Card className="ui-settings-card" bordered={false}>
      <Title level={3}>User Interface Settings</Title>
      <Tabs defaultActiveKey="theme" size="large">
        <TabPane tab={<span className="tab-title">Theme</span>} key="theme">
          <Form name="theme-settings" onFinish={onFinish} layout="vertical">
            <Form.Item name="theme" label="Select Theme">
              <Select placeholder="Select theme">
                <Option value="default">Default</Option>
                <Option value="dark">Dark</Option>
                <Option value="compact">Compact</Option>
                <Option value="default-dark">Default Dark</Option>
              </Select>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab={<span className="tab-title">Language</span>} key="language">
          <Form name="language-settings" onFinish={onFinish} layout="vertical">
            <Form.Item name="language" label="Select Language">
              <Select placeholder="Select language">
                <Option value="en">English</Option>
                <Option value="fr">French</Option>
                <Option value="es">Spanish</Option>
              </Select>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab={<span className="tab-title">Font</span>} key="font">
          <Form name="font-settings" onFinish={onFinish} layout="vertical">
            <Form.Item name="fontFamily" label="Font Family">
              <Select placeholder="Select font family">
                <Option value="Arial">Arial</Option>
                <Option value="Verdana">Verdana</Option>
                <Option value="Times New Roman">Times New Roman</Option>
              </Select>
            </Form.Item>
            <Form.Item name="fontSize" label="Font Size">
              <Input type="number" addonAfter="px" placeholder="Font size in pixels" />
            </Form.Item>
            <Form.Item name="fontWeight" label="Font Weight">
              <Input type="number" placeholder="Font weight" />
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab={<span className="tab-title">Layout</span>} key="layout">
          <Form name="layout-settings" onFinish={onFinish} layout="vertical">
            <Form.Item name="layout" label="Select Layout">
              <Select placeholder="Select layout">
                <Option value="fixed">Fixed</Option>
                <Option value="fluid">Fluid</Option>
              </Select>
            </Form.Item>
            <Form.Item name="sidebarCollapsed" label="Sidebar Collapsed" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="headerFixed" label="Header Fixed" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab={<span className="tab-title">Accessibility</span>} key="accessibility">
          <Form name="accessibility-settings" onFinish={onFinish} layout="vertical">
            <Form.Item name="highContrast" label="High Contrast" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="textToSpeech" label="Text to Speech" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="screenReader" label="Screen Reader" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab={<span className="tab-title">Advanced</span>} key="advanced">
          <Form name="advanced-settings" onFinish={onFinish} layout="vertical">
            <Form.Item name="advancedOptions" label="Enable Advanced Options" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="customCSS" label="Custom CSS">
              <Input.TextArea rows={4} placeholder="Enter custom CSS" />
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
      {/* Submit button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">Save Settings</Button>
      </Form.Item>
    </Card>
  );
};

export default UISettingsPage;
