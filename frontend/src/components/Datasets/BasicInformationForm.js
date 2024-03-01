import React from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const BasicInformationForm = () => {
  return (
    <Form
      name="basic-information-form"
      layout="vertical"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter the dataset name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter the dataset description' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Tags"
        name="tags"
      >
        <Select mode="tags" style={{ width: '100%' }} placeholder="Tags">
          <Option key="biology">Biology</Option>
          <Option key="genomics">Genomics</Option>
          <Option key="protein">Protein</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Visibility"
        name="visibility"
      >
        <Select style={{ width: '100%' }} placeholder="Select visibility">
          <Option value="public">Public</Option>
          <Option value="private">Private</Option>
          <Option value="shared">Shared</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default BasicInformationForm;
