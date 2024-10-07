import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types"; // 引入 PropTypes

const UserEditForm = ({ visible, onCancel, onSubmit, editingMember }) => {
  const [form] = Form.useForm();

  // 当 editingMember 改变时，重新设置表单初始值
  useEffect(() => {
    if (editingMember) {
      form.setFieldsValue({
        first_name: editingMember.first_name,
        last_name: editingMember.last_name,
        email: editingMember.email,
      });
    }
  }, [editingMember, form]);

  const handleFinish = async (values) => {
    await onSubmit(editingMember.id, values); // 调用父组件传递的 onSubmit 函数，并将编辑的用户 ID 和表单值传递过去
  };

  return (
    <Modal
      title="Edit Member"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      {editingMember && (
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "Please input first name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Please input last name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={onCancel} style={{ marginLeft: "10px" }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

// 添加 PropTypes 验证
UserEditForm.propTypes = {
  visible: PropTypes.bool.isRequired, // visible 是布尔值，必需
  onCancel: PropTypes.func.isRequired, // onCancel 是函数，必需
  onSubmit: PropTypes.func.isRequired, // onSubmit 是函数，必需
  editingMember: PropTypes.shape({
    // editingMember 是一个对象，可以为 null
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default UserEditForm;
