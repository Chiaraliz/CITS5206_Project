// src/components/AdminTable.jsx
import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;

// 模拟管理员数据，添加 password 字段
const adminData = [
  {
    key: "1",
    firstName: "Alice",
    lastName: "Smith",
    password: "password123",
    tags: ["admin", "superuser"],
  },
  {
    key: "2",
    firstName: "Bob",
    lastName: "Johnson",
    password: "admin456",
    tags: ["admin"],
  },
  // 添加更多管理员数据
];

const AdminTable = () => (
  <Table dataSource={adminData}>
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
    </ColumnGroup>
    <Column title="Password" dataIndex="password" key="password" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "superuser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={() => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      )}
    />
  </Table>
);

export default AdminTable;
