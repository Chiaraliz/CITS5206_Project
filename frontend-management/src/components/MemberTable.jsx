import { Space, Table, Button } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import PropTypes from "prop-types";

const { Column } = Table;

const handleDelete = async (customerId) => {
  if (window.confirm("Are you sure you want to cancel this subscription?")) {
    try {
      // 向后端发送取消请求
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: customerId,
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert("Subscription cancelled successfully!");
        // 在这里你可以调用一个方法来刷新页面或移除已取消的用户
      } else {
        alert("Failed to cancel subscription: " + result.message);
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    }
  }
};

const MemberTable = ({ members, loading }) => {
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
        render={(created_at) =>
          new Date(created_at * 1000).toLocaleDateString()
        }
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <Button onClick={() => handleDelete(record.id)}>Edit Member</Button>
          </Space>
        )}
      />
    </Table>
  );
};

MemberTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MemberTable;
