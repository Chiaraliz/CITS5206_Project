// src/pages/AddAdmin.jsx

import { Form, Input, Button, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registerAdmin } from '../api/adminApi'; // 导入 registerAdmin 函数

const AddAdmin = () => {
  const navigate = useNavigate();

  // 表单提交处理函数
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    
    try {
      // 调用 API 注册管理员
      const response = await registerAdmin(values.username, values.password);

      // 如果后端返回成功信息，显示提示消息
      message.success('Admin registered successfully!');
      // 模拟成功添加管理员后返回到管理员列表页面
      navigate('/rootdashboard');
    } catch (error) {
      console.error('Error registering admin:', error);
      message.error('An error occurred while registering the admin. Please try again.');
    }
  };

  return (
    <Row justify="center" style={{ marginTop: '50px' }}>
      <Col span={12}>
        <h2>Add New Admin</h2>
        <Form
          name="add_admin"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input the username!' }]}
          >
            <Input placeholder="Enter admin's username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input the password!' }]}
          >
            <Input.Password placeholder="Enter a secure password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register Admin
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default AddAdmin;
