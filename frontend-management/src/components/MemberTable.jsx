import { Space, Table, Button } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import PropTypes from "prop-types";

const { Column } = Table;

const MemberTable = ({ members, loading, onEdit }) => {
  return (
    <Table dataSource={members} loading={loading} rowKey="id">
      <Column title="ID" dataIndex="id" key="id" />
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="first_name" key="first_name" />
        <Column title="Last Name" dataIndex="last_name" key="last_name" />
      </ColumnGroup>
      <Column title="Email" dataIndex="email" key="email" />
      <Column
        title="Created At"
        dataIndex="created_at"
        key="created_at"
        render={
          (created_at) =>
            created_at
              ? new Date(created_at).toLocaleDateString() // 直接将日期字符串转换为 Date 对象
              : "N/A" // 如果 created_at 为 null 或 undefined，显示 "N/A"
        }
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <Button onClick={() => onEdit(record)}>Edit</Button>
          </Space>
        )}
      />
    </Table>
  );
};

// 添加 PropTypes 验证
MemberTable.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // 确保成员 id 是 string 类型
      first_name: PropTypes.string.isRequired, // 确保 first_name 是 string 类型
      last_name: PropTypes.string.isRequired, // 确保 last_name 是 string 类型
      email: PropTypes.string.isRequired, // 确保 email 是 string 类型
    })
  ).isRequired, // 确保 members 是必需的数组
  loading: PropTypes.bool.isRequired, // loading 是布尔值，必需
  onEdit: PropTypes.func.isRequired, // onEdit 是函数，必需
};

export default MemberTable;
