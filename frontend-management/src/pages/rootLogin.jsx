import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import Logo from '../components/Logo'; // 确保正确导入 Logo 组件
import { loginRoot } from '../services/AdminService'; // 确保指向 AdminService.js
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate 钩子
import { useMoveBack } from '../hooks/useMoveBack'; // 引入 useMoveBack 钩子

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
  text-align: center;
  color: var(--color-grey-600);
  margin: 0;
`;

const RootLogin = () => { 
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const navigate = useNavigate(); // 使用 useNavigate 钩子进行页面导航
  const moveBack = useMoveBack(); // 获取返回上一页的函数

  useEffect(() => {
    setClientReady(true);
  }, []);

  // 处理表单提交
  const onFinish = async (values) => {
    try {
      // 调用 loginRoot API 函数进行登录
      const response = await loginRoot(values.username, values.password);
      // 显示成功信息
      message.success(response.message);
      console.log('Login Successful:', response);

      // 跳转到 RootDashboard 页面
      navigate('/rootdashboard'); // 假设 "/rootdashboard" 是 RootDashboard 页面的路由路径
    } catch (error) {
      // 显示错误信息
      message.error(error.response?.data?.error || 'Login failed');
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginLayout>
      {/* 在表单上方显示 Logo */}
      <Logo />
      <RootText>Root</RootText> {/* 添加文本行 */}

      <Form
        form={form}
        name="login_form"
        layout="vertical" // 设置布局为垂直
        onFinish={onFinish} // 表单提交时调用 onFinish
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
        
        {/* 取消按钮 */}
        <Form.Item>
          <Button type="default" onClick={moveBack}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </LoginLayout>
  );
};

export default RootLogin;
