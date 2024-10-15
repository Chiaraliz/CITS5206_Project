import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import Logo from '../components/Logo'; // 确保正确导入 Logo 组件
import { loginAdmin } from '../services/AdminService'; // 使用 loginAdmin 代替 loginRoot
import { useNavigate } from 'react-router-dom';

// 使用 styled-components 定义布局
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // 增加加载状态
  const [clientReady, setClientReady] = useState(false);
  const navigate = useNavigate(); // 使用 useNavigate 钩子进行页面导航

  // 当组件挂载时设置客户端准备状态
  useEffect(() => {
    setClientReady(true);
  }, []);

  // 表单提交时处理登录请求
  const onFinish = async (values) => {
    try {
      setLoading(true); // 启用加载状态
      const response = await loginAdmin(values.username, values.password);
      message.success('Login successful');
      console.log('Login Successful:', response);

      // 存储普通用户的登录状态，并跳转到 Dashboard 页面
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } catch (error) {
      message.error(error?.response?.data?.error || 'Login failed');
      console.error('Login failed:', error);
    } finally {
      setLoading(false); // 请求完成后禁用加载状态
    }
  };

  // 处理 Root Login 按钮点击，跳转到 "/rootLogin"
  const handleRootLogin = () => {
    navigate('/rootLogin'); // 跳转到 RootLogin 页面
  };

  return (
    <LoginLayout>
      {/* 显示 Logo */}
      <Logo />

      <Form
        form={form}
        name="login_form"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              loading={loading} // 按钮显示加载状态
              disabled={
                !clientReady || 
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>

        {/* Root Login 按钮 */}
        <Form.Item>
          <Button type="link" onClick={handleRootLogin}>
            Root Login
          </Button>
        </Form.Item>
      </Form>
    </LoginLayout>
  );
};

export default Login;