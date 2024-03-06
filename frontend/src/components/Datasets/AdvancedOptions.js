import React from 'react';
import { Form, Switch, Select, DatePicker, Radio, Input, Tabs } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

const AdvancedOptions = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Compression & Encryption" key="1">
        <Form
          name="advanced-options-form"
          layout="vertical"
        >
          <Form.Item
            label="Compression Type"
            name="compressionType"
          >
            <Select defaultValue="none">
              <Option value="none">None</Option>
              <Option value="zip">ZIP</Option>
              <Option value="gzip">GZIP</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Encryption"
            name="encryption"
          >
            <Switch />
          </Form.Item>
        </Form>
      </TabPane>
      <TabPane tab="File Settings" key="2">
        <Form
          name="advanced-options-form"
          layout="vertical"
        >
          <Form.Item
            label="File Expiration Date"
            name="fileExpirationDate"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Enable Versioning"
            name="enableVersioning"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </TabPane>
      <TabPane tab="File Management" key="3">
        <Form
          name="advanced-options-form"
          layout="vertical"
        >
          <Form.Item
            label="File Tags"
            name="fileTags"
          >
            <Select mode="tags" placeholder="Add tags">
              {/* Add options dynamically */}
            </Select>
          </Form.Item>
          <Form.Item
            label="File Categories"
            name="fileCategories"
          >
            <Input.TextArea rows={4} placeholder="Enter categories" />
          </Form.Item>
          <Form.Item
            label="File Permissions"
            name="filePermissions"
          >
            <Radio.Group>
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
              <Radio value="restricted">Restricted</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </TabPane>
      <TabPane tab="Access Control & Retention" key="4">
        <Form
          name="advanced-options-form"
          layout="vertical"
        >
          <Form.Item
            label="File Access Controls"
            name="fileAccessControls"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="File Retention Policy"
            name="fileRetentionPolicy"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </TabPane>
    </Tabs>
  );
};

export default AdvancedOptions;