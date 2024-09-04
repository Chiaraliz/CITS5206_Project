import PropTypes from "prop-types";

function ButtonIcon({ children }) {
  return (
    <button className="bg-none border-none p-2 rounded-sm transition duration-200 hover:bg-gray-100">
      <span className="w-9 h-9 text-brand-600">{children}</span>
    </button>
  );
}

ButtonIcon.propTypes = {
  children: PropTypes.node.isRequired, // 验证 children 是否传递，并且是 React 可渲染的节点
};

export default ButtonIcon;
