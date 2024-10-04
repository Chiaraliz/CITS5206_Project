import { Navigate } from "react-router-dom";

// ProtectedRoute 组件
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // 从localStorage中获取token

  // 如果token不存在，重定向到登录页面
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 如果token存在，允许访问受保护的页面
  return children;
}

export default ProtectedRoute;
