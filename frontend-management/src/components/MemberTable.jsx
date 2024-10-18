import { Space, Table, Modal, Button } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const { Column } = Table;

const MemberTable = ({ members, loading, onEdit }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [membersWithStatus, setMembersWithStatus] = useState([]);

  // useEffect hook to load subscription status for each member when component mounts
  useEffect(() => {
    const fetchSubscriptionStatusForMembers = async () => {
      try {
        // Map over members and fetch subscription status for each
        const membersWithStatus = await Promise.all(
          members.map(async (member) => {
            const response = await axios.get(`/user/${member.id}/subscription`);
            return { ...member, status: response.data.status || "N/A" }; // Append status to member data
          })
        );
        setMembersWithStatus(membersWithStatus);
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };

    if (members.length > 0) {
      fetchSubscriptionStatusForMembers();
    }
  }, [members]); // Depend on members array to trigger effect when members change

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedMember(null);
    setSubscriptionStatus("");
  };

  return (
    <>
      <Table dataSource={membersWithStatus} loading={loading} rowKey="id">
        <Column title="ID" dataIndex="id" key="id" />
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="first_name" key="first_name" />
          <Column title="Last Name" dataIndex="last_name" key="last_name" />
        </ColumnGroup>
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Created At"
          dataIndex="membership_start_time"
          key="membership_start_time"
          render={(membership_start_time) =>
            membership_start_time
              ? new Date(membership_start_time).toLocaleDateString()
              : "N/A"
          }
        />
        {/* Status column now directly shows the fetched status */}
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
