import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Table } from 'antd';
import { fetchAdmins } from '../api/adminApi'; // 引入 API 方法
import Heading from '../components/Heading';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate

const RootDashboard = () => {
  const navigate = useNavigate(); // 使用 useNavigate
  const [totalAdmins, setTotalAdmins] = useState(0); // 总管理员数量
  const [activeAdmins, setActiveAdmins] = useState(0); // 活跃管理员数量
  const [loading, setLoading] = useState(true); // 加载状态
  const [adminData, setAdminData] = useState([]); // 管理员数据

  // 调用API获取管理员列表
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAdmins(); // 调用 fetchAdmins API
        setAdminData(data); // 假设返回的数据是管理员数组
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setLoading(false);
      }
    };

    fetchData(); // 获取管理员信息
  }, []);

  // 表格列定义
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: (text) => "********", // 隐藏实际密码，仅显示星号
    },
  ];

  return (
    <>
      <Row style={{ marginBottom: '24px' }}>
        <Heading as="h1">Admin Management Dashboard</Heading>
      </Row>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={12}>
          <Card title="Total Admins" loading={loading}>
            <p>{adminData.length}</p> {/* 显示管理员总数 */}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Active Admins" loading={loading}>
            <p>{activeAdmins}</p> {/* 可以添加获取活跃管理员的逻辑 */}
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Button type="primary" onClick={() => navigate("/addAdmin")}>
            Add Admin
          </Button>
        </Col>
      </Row>

      {/* 添加管理员信息表格 */}
      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={adminData} // 绑定表格数据
            rowKey="username" // 使用用户名作为唯一标识
            pagination={false} // 不需要分页
          />
        </Col>
      </Row>
    </>
  );
};

export default RootDashboard;
