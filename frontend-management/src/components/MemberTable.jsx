import { Space, Table, Button } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";

const { Column } = Table;

const MemberTable = ({ members, loading }) => {
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
