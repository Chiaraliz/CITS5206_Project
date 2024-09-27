import { Modal } from "antd";
function CustomModal({ open, hideModal }) {
  return (
    <Modal
      title="Cancel"
      open={open}
      onOk={hideModal}
      onCancel={hideModal}
      okText="Yes"
      cancelText="No"
      style={{
        top: "40%",
        margin: "0 auto",
      }}
    >
      <p>Are you sure you want to cancel subscription?</p>
    </Modal>
  );
}

export default CustomModal;
