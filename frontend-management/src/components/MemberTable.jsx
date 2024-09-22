import { useEffect, useState } from "react";
import { Space, Table, Button } from "antd";
import axios from "axios"; // 用于发起 API 请求
import ColumnGroup from "antd/es/table/ColumnGroup";
const { Column } = Table;

// 更新后的示例数据，包含20条用户数据，membership_type为"active"和"inactive"
const fallbackData = [
  {
    key: "1",
    id: 1,
    first_name: "User1",
    last_name: "LastName1",
    email: "user1@example.com",
    date_of_birth: "1991-02-12",
    membership_type: "inactive",
  },
  {
    key: "2",
    id: 2,
    first_name: "User2",
    last_name: "LastName2",
    email: "user2@example.com",
    date_of_birth: "1992-03-13",
    membership_type: "active",
  },
  {
    key: "3",
    id: 3,
    first_name: "User3",
    last_name: "LastName3",
    email: "user3@example.com",
    date_of_birth: "1993-04-14",
    membership_type: "inactive",
  },
  {
    key: "4",
    id: 4,
    first_name: "User4",
    last_name: "LastName4",
    email: "user4@example.com",
    date_of_birth: "1994-05-15",
    membership_type: "active",
  },
  {
    key: "5",
    id: 5,
    first_name: "User5",
    last_name: "LastName5",
    email: "user5@example.com",
    date_of_birth: "1995-06-16",
    membership_type: "inactive",
  },
  {
    key: "6",
    id: 6,
    first_name: "User6",
    last_name: "LastName6",
    email: "user6@example.com",
    date_of_birth: "1996-07-17",
    membership_type: "active",
  },
  {
    key: "7",
    id: 7,
    first_name: "User7",
    last_name: "LastName7",
    email: "user7@example.com",
    date_of_birth: "1997-08-18",
    membership_type: "inactive",
  },
  {
    key: "8",
    id: 8,
    first_name: "User8",
    last_name: "LastName8",
    email: "user8@example.com",
    date_of_birth: "1998-09-19",
    membership_type: "active",
  },
  {
    key: "9",
    id: 9,
    first_name: "User9",
    last_name: "LastName9",
    email: "user9@example.com",
    date_of_birth: "1999-01-110",
    membership_type: "inactive",
  },
  {
    key: "10",
    id: 10,
    first_name: "User10",
    last_name: "LastName10",
    email: "user10@example.com",
    date_of_birth: "1990-02-111",
    membership_type: "active",
  },
  {
    key: "11",
    id: 11,
    first_name: "User11",
    last_name: "LastName11",
    email: "user11@example.com",
    date_of_birth: "1991-03-112",
    membership_type: "inactive",
  },
  {
    key: "12",
    id: 12,
    first_name: "User12",
    last_name: "LastName12",
    email: "user12@example.com",
    date_of_birth: "1992-04-113",
    membership_type: "active",
  },
  {
    key: "13",
    id: 13,
    first_name: "User13",
    last_name: "LastName13",
    email: "user13@example.com",
    date_of_birth: "1993-05-114",
    membership_type: "inactive",
  },
  {
    key: "14",
    id: 14,
    first_name: "User14",
    last_name: "LastName14",
    email: "user14@example.com",
    date_of_birth: "1994-06-115",
    membership_type: "active",
  },
  {
    key: "15",
    id: 15,
    first_name: "User15",
    last_name: "LastName15",
    email: "user15@example.com",
    date_of_birth: "1995-07-116",
    membership_type: "inactive",
  },
  {
    key: "16",
    id: 16,
    first_name: "User16",
    last_name: "LastName16",
    email: "user16@example.com",
    date_of_birth: "1996-08-117",
    membership_type: "active",
  },
  {
    key: "17",
    id: 17,
    first_name: "User17",
    last_name: "LastName17",
    email: "user17@example.com",
    date_of_birth: "1997-09-118",
    membership_type: "inactive",
  },
  {
    key: "18",
    id: 18,
    first_name: "User18",
    last_name: "LastName18",
    email: "user18@example.com",
    date_of_birth: "1998-01-119",
    membership_type: "active",
  },
  {
    key: "19",
    id: 19,
    first_name: "User19",
    last_name: "LastName19",
    email: "user19@example.com",
    date_of_birth: "1999-02-120",
    membership_type: "inactive",
  },
  {
    key: "20",
    id: 20,
    first_name: "User20",
    last_name: "LastName20",
    email: "user20@example.com",
    date_of_birth: "1990-03-121",
    membership_type: "active",
  },
];

const MemberTable = () => {
  const [members, setMembers] = useState(fallbackData); // 默认使用示例数据
  const [loading, setLoading] = useState(false);

  // 从后端 API 获取数据
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        // 发送请求到后端 API
        const response = await axios.get(
          "http://your-backend-url.com/api/members"
        );
        if (response.data && response.data.length > 0) {
          setMembers(response.data); // 如果有数据，使用后端返回的数据
        }
      } catch (error) {
        console.error("Failed to fetch members, using fallback data.", error);
        // 如果获取失败，继续使用示例数据
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []); // 空依赖数组，确保只在组件首次加载时运行

  return (
    <Table dataSource={members} loading={loading}>
      <Column title="ID" dataIndex="id" key="id" />
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="first_name" key="first_name" />
        <Column title="Last Name" dataIndex="last_name" key="last_name" />
      </ColumnGroup>
      <Column title="Email" dataIndex="email" key="email" />
      <Column
        title="Date of Birth"
        dataIndex="date_of_birth"
        key="date_of_birth"
      />
      <Column
        title="Membership Type"
        dataIndex="membership_type"
        key="membership_type"
      />
      <Column
        title="Action"
        key="action"
        render={() => (
          <Space size="middle">
            <Button type="link">Edit</Button>
            <Button type="link">Delete</Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default MemberTable;
