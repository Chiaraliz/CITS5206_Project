import { Space, Table, Button, Modal } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

const { Column } = Table;

const MemberTable = ({ members, loading, onEdit }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  const handleCheckStatus = async (userId) => {
    try {
      const response = await axios.get(`/user/${userId}/subscription`);
      setSubscriptionStatus(response.data.status); // Assuming the status is in the 'status' field
      setSelectedMember(userId);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      setSubscriptionStatus("Error fetching status");
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedMember(null);
    setSubscriptionStatus("");
  };

  return (
    <>
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
            created_at ? new Date(created_at).toLocaleDateString() : "N/A"
          }
        />
        {/* 新增的 Status 列 */}
        <Column
          title="Status"
          key="status"
          render={(text, record) => (
            <Button onClick={() => handleCheckStatus(record.id)}>
              Fetch User Status
            </Button>
          )}
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

      {/* 弹窗显示状态 */}
      <Modal
        title={`User ${selectedMember} Status`}
        visible={isModalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
      >
        <p>{subscriptionStatus}</p>
      </Modal>
    </>
  );
};

MemberTable.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default MemberTable;
