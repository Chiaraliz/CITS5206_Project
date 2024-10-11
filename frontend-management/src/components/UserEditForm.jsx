import { Modal, Form, Input, Button, notification } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types"; // 引入 PropTypes

const UserEditForm = ({
  visible,
  onCancel,
  onChargebeeSubmit, // 删除 onSubmit
  editingMember,
}) => {
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

  // 提交到 Chargebee
  const handleFinish = async () => {
    // 删除第二个 values 定义
    try {
      const values = await form.validateFields(); // 验证并获取表单的值
      await onChargebeeSubmit(editingMember.id, values); // 提交数据到 Chargebee
      notification.success({
        message: "Chargebee Update Successful",
        description:
          "The Chargebee member information has been updated successfully.",
        placement: "topRight",
      });
      form.resetFields(); // 清空表单
    } catch (error) {
      notification.error({
        message: "Chargebee Update Failed",
        description:
          "There was an error updating the Chargebee member information. Please try again.",
        placement: "topRight",
      });
    }
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
  onChargebeeSubmit: PropTypes.func.isRequired, // 删除 onSubmit
  editingMember: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default UserEditForm;
