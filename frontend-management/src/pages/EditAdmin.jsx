import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 获取路由参数和导航
import { Form, Input, Button, message, Spin } from 'antd';
import { useAdmin } from '../hooks/useAdmin'; // 使用 useAdmin 钩子

const EditAdmin = () => {
  const [form] = Form.useForm();
  const { id } = useParams(); // 获取路由中的 id
  const { admins, updateAdmin, loading, error, loadAdmins } = useAdmin(); // 从钩子中提取功能
  const navigate = useNavigate(); // 用于页面跳转

  // 查找并设置管理员信息到表单
  useEffect(() => {
    if (admins.length === 0) {
      loadAdmins(); // 确保管理员数据被加载
    }
    const admin = admins.find((admin) => admin.id === parseInt(id)); // 查找管理员
    if (admin) {
      form.setFieldsValue(admin); // 填充表单数据
    }
  }, [admins, id, form, loadAdmins]);

  // 提交表单并更新管理员
  const onFinish = async (values) => {
    try {
      await updateAdmin(id, values); // 调用 updateAdmin 函数
      message.success('Admin updated successfully!');
      navigate('/rootdashboard'); // 更新成功后跳转到管理员列表页面
    } catch (error) {
      message.error('Failed to update admin');
    }
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2>Edit Admin</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 显示错误 */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input the username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input the password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Admin
          </Button>
          <Button type="default" onClick={() => navigate('/rootdashboard')} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditAdmin;
