import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Checkbox, Divider, Form, Input, Popconfirm, Select, Space, Table, Tag, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const UserSettingsTab = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const isEditing = (record) => record.key === editingKey;

  const handleEdit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const handleDelete = (key) => {
    setUsers(users.filter((user) => user.key !== key));
  };

  const handleSave = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...users];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setUsers(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setUsers(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      editable: true,
      render: (role) => (
        <Select style={{ width: 120 }} defaultValue={role}>
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
        </Select>
      ),
    },
    {
      title: 'Active',
      dataIndex: 'active',
      editable: true,
      render: (_, record) => (
        <Checkbox defaultChecked={record.active} />
      ),
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
    const key = users.length + 1;
    const newUser = { key, ...values };
    setUsers([...users, newUser]);
    form.resetFields();
  };

  return (
    <Card>
      <Title level={3}>User Management</Title>
      <Form form={form} onFinish={onFinish} layout="inline">
        <Form.Item name="username" rules={[{ required: true, message: 'Please input username!' }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="role" initialValue="user">
          <Select style={{ width: 120 }}>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit"><PlusOutlined /> Add User</Button>
        </Form.Item>
      </Form>
      <Divider />
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={users}
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

export default UserSettingsTab;
