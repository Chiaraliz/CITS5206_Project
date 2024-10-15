import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import Logo from '../components/Logo'; // 确保正确导入 Logo 组件
import { loginRoot } from '../services/AdminService'; // 指向正确的服务函数
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate 钩子
import { useMoveBack } from '../hooks/useMoveBack'; // 引入自定义的 useMoveBack 钩子

// 定义布局样式
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
  const [loading, setLoading] = useState(false); // 添加加载状态
  const navigate = useNavigate();
  const moveBack = useMoveBack(); // 获取返回上一页的函数

  // 初始化时设置客户端准备状态
  useEffect(() => {
    form.resetFields(); // 每次加载页面时重置表单
  }, [form]);

  // 表单提交时处理 Root 用户登录逻辑
  const onFinish = async (values) => {
    try {
      setLoading(true); // 启用加载状态

      // 调用 loginRoot API 进行登录
      const response = await loginRoot(values.username, values.password);
      message.success(response.message || 'Login successful');
      console.log('Root Login Successful:', response);

      // 保存 Root 用户登录状态
      localStorage.setItem('isRootAuthenticated', 'true');

      // 跳转到 RootDashboard 页面
      navigate('/rootdashboard');
    } catch (error) {
      message.error(error?.response?.data?.error || 'Login failed');
      console.error('Root Login failed:', error);
    } finally {
      setLoading(false); // 请求完成后禁用加载状态
    }
  };

  return (
    <LoginLayout>
      <Logo /> {/* 在表单上方显示 Logo */}
      <RootText>Root Login</RootText> {/* 添加标题 */}

      <Form
        form={form}
        name="root_login_form"
        layout="vertical" // 使用垂直布局
        onFinish={onFinish} // 表单提交时调用 onFinish
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
                loading || // 加载时禁用按钮
                !form.isFieldsTouched(true) || // 当表单未修改时禁用按钮
                !!form.getFieldsError().filter(({ errors }) => errors.length).length // 当表单有错误时禁用按钮
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="default" onClick={moveBack}>
            Exit
          </Button>
        </Form.Item>
      </Form>
    </LoginLayout>
  );
};

export default RootLogin;