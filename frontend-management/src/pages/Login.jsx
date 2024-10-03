import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Logo from '../components/Logo'; // 确保正确导入 Logo 组件
import { loginAdmin } from '../api/adminApi'; // 导入 loginAdmin API 请求函数

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

  // 当组件挂载时设置客户端准备状态
  useEffect(() => {
    setClientReady(true);
  }, []);

  // 处理表单提交，发送登录请求
  const onFinish = async (values) => {
    try {
      // 发送 API 请求，使用用户输入的用户名和密码
      const response = await loginAdmin(values.username, values.password);
      console.log('Login successful:', response);
      // 可以在这里处理成功登录的逻辑，例如保存 token 或跳转页面
    } catch (error) {
      console.error('Login failed:', error);
      // 你可以在这里显示错误信息给用户
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
                !form.isFieldsTouched(true) || // 当表单未修改时禁用按钮
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
