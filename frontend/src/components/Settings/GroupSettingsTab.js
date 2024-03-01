import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Form, Input, Popconfirm, Space, Table, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const GroupSettingsTab = () => {
  const [form] = Form.useForm();
  const [groups, setGroups] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const isEditing = (record) => record.key === editingKey;

  const handleEdit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const handleDelete = (key) => {
    setGroups(groups.filter((group) => group.key !== key));
  };

  const handleSave = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...groups];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setGroups(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setGroups(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Group Name',
      dataIndex: 'groupName',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      editable: true,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="small">
            <Button type="primary" onClick={() => handleSave(record.key)}>Save</Button>
            <Popconfirm title="Sure to cancel?" onConfirm={() => setEditingKey('')}>
              <Button>Cancel</Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space size="small">
            <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <Button danger><DeleteOutlined /></Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => ({
    ...col,
    onCell: (record) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
    }),
  }));

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish = (values) => {
    const key = groups.length + 1;
    const newGroup = { key, ...values };
    setGroups([...groups, newGroup]);
    form.resetFields();
  };

  return (
    <Card>
      <Title level={3}>Group Management</Title>
      <Form form={form} onFinish={onFinish} layout="inline">
        <Form.Item name="groupName" rules={[{ required: true, message: 'Please input group name!' }]}>
          <Input placeholder="Group Name" />
        </Form.Item>
        <Form.Item name="description">
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit"><PlusOutlined /> Add Group</Button>
        </Form.Item>
      </Form>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={groups}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowSelection={rowSelection}
      />
    </Card>
  );
};

const EditableCell = ({ title, editable, children, dataIndex, record, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const save = async (e) => {
    try {
      const value = e.target.value;
      toggleEdit();
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Input ref={inputRef} onPressEnter={save} onBlur={save} />
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default GroupSettingsTab;
