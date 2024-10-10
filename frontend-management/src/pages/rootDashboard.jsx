import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Table, Popconfirm, message } from 'antd';
import Heading from '../components/Heading';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import { fetchAdmins, deleteAdmin } from '../services/AdminService'; // 引入服务函数

const RootDashboard = () => {
  const navigate = useNavigate(); // 使用 useNavigate
  const [totalAdmins, setTotalAdmins] = useState(0); // 总管理员数量
  const [loading, setLoading] = useState(true); // 加载状态
  const [adminData, setAdminData] = useState([]); // 管理员数据

  // 调用API获取管理员统计数据和管理员列表
  useEffect(() => {
    const fetchAdminCounts = async () => {
      try {
        const admins = await fetchAdmins();
        setTotalAdmins(admins.length); // 总管理员数量为返回数据的长度
        setAdminData(admins); // 设置管理员数据
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setLoading(false);
      }
    };

    fetchAdminCounts(); // 获取管理员信息
  }, []);

  // 删除管理员的函数
  const handleDelete = async (username) => {
    try {
      await deleteAdmin(username); // 使用 deleteAdmin 函数删除管理员
      message.success('Admin deleted successfully');
      setAdminData(adminData.filter((admin) => admin.username !== username)); // 删除本地数据中的管理员
    } catch (error) {
      message.error('Failed to delete admin');
      console.error('Error deleting admin:', error);
    }
  };

  // 表格列定义，增加了 Edit 和 Delete 操作
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
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button
            type="link"
            onClick={() => navigate(`/editAdmin/${record.id}`)} // 使用 admin.id 而不是 username 作为参数
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this admin?"
            onConfirm={() => handleDelete(record.username)} // 调用删除函数
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <Row style={{ marginBottom: '24px' }}>
        <Heading as="h1">Admin Management Dashboard</Heading>
      </Row>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={24}>
          <Card title="Total Admins" loading={loading}>
            <p>{totalAdmins}</p>
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
            dataSource={adminData}
            rowKey="id" // 使用 id 作为 rowKey
            pagination={false}
          />
        </Col>
      </Row>
    </>
  );
};

export default RootDashboard;
