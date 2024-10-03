import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Logo from '../components/Logo'; // 确保正确导入 Logo 组件
import { loginRoot } from '../api/adminApi'; // 导入 Root 登录 API 函数

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

const RootText = styled.h2`
  text-align: center; // 中心对齐
  color: var(--color-grey-600); // 字体颜色
  margin: 0; // 去掉默认的外边距
`;

const RootLogin = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // 错误信息状态
  const [successMessage, setSuccessMessage] = useState(null); // 成功信息状态

  // 当组件挂载时设置客户端准备状态
  useEffect(() => {
    setClientReady(true);
  }, []);

  // 表单提交处理函数
  const onFinish = async (values) => {
    try {
      // 调用 loginRoot API，将用户名和密码发送给后端
      const response = await loginRoot(values.username, values.password);
      setSuccessMessage('Login successful'); // 显示成功消息
      console.log('Login successful:', response);
      // 你可以在这里处理登录成功后的逻辑，例如跳转到 root 管理员的 dashboard
    } catch (error) {
      setErrorMessage(error.error || 'Login failed'); // 显示错误消息
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginLayout>
      {/* 在表单上方显示 Logo */}
      <Logo />
      <RootText>Root</RootText> {/* 添加文本行 */}

      {/* 如果有错误或成功信息，显示出来 */}
      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      <Form
        form={form}
        name="login_form"
        layout="vertical" // 设置布局为垂直
        onFinish={onFinish} // 表单提交事件
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

export default RootLogin;
