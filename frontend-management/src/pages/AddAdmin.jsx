// src/pages/AddAdmin.jsx

import { Form, Input, Button, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // 这里你可以添加逻辑来处理添加管理员，例如将数据发送到后端
    message.success('Admin added successfully!');
    // 模拟成功添加管理员后返回到管理员列表页面
    navigate('/rootdashboard');
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <h2>Add New Admin</h2>
        <Form
          name="add_admin"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input the first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input the last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input the password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Admin
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default AddAdmin;