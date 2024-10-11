import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import Logo from '../components/Logo'; // 确保正确导入 Logo 组件
import { loginAdmin } from '../services/AdminService'; // 使用 loginAdmin 代替 loginRoot
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate 钩子

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
  const [clientReady, setClientReady] = useState(false);
  const navigate = useNavigate(); // 使用 useNavigate 钩子进行页面导航

  // 当组件挂载时设置客户端准备状态
  useEffect(() => {
    setClientReady(true);
  }, []);

  // 表单提交时处理登录请求
  const onFinish = async (values) => {
    try {
      // 调用 loginAdmin API 函数进行用户登录
      const response = await loginAdmin(values.username, values.password);
      
      // 登录成功的反馈
      message.success('Login successful');
      console.log('Login Successful:', response);

      // 跳转到 Dashboard 页面
      navigate('/dashboard'); // 假设 "/dashboard" 是 Dashboard 页面的路由路径
    } catch (error) {
      // 登录失败的反馈
      message.error(error?.response?.data?.error || 'Login failed');
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginLayout>
      {/* 在表单上方显示 Logo */}
      <Logo />

      <Form
        form={form}
        name="login_form"
        layout="vertical" // 设置布局为垂直，符合标准登录表单设计
        onFinish={onFinish}
      >
        {/* 用户名输入框 */}
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        {/* 密码输入框 */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>

        {/* 登录按钮 */}
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !clientReady || // 当客户端未准备好时禁用按钮
                !!form.getFieldsError().filter(({ errors }) => errors.length).length // 当表单有错误时禁用按钮
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </LoginLayout>
  );
};

export default Login;
