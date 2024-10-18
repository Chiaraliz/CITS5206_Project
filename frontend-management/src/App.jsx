import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import AddAdmin from "./pages/AddAdmin";
import Dashboard from "./pages/Dashboard";
import RootDashboard from "./pages/rootDashboard";
import Users from "./pages/Members";
import Account from "./pages/Account";
import Login from "./pages/Login";
import RootLogin from "./pages/rootLogin";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import RootAppLayout from "./components/RootAppLayout";
import EditAdmin from "./pages/EditAdmin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // 两个独立的登录状态：普通用户和 Root 用户
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [isRootAuthenticated, setIsRootAuthenticated] = useState(
    localStorage.getItem("isRootAuthenticated") === "true"
  );

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsRootAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isRootAuthenticated");
  };

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* 普通用户登录 */}
          <Route
            path="login"
            element={<Login onLogin={() => {
              setIsAuthenticated(true);
              localStorage.setItem("isAuthenticated", "true");
            }} />}
          />

          {/* Root 用户登录 */}
          <Route
            path="rootLogin"
            element={<RootLogin onLogin={() => {
              setIsRootAuthenticated(true);
              localStorage.setItem("isRootAuthenticated", "true");
            }} />}
          />

          {/* 受保护的普通用户路由 */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="account" element={<Account />} />
            </Route>
          </Route>

          {/* 受保护的 Root 用户路由 */}
          <Route element={<ProtectedRoute isAuthenticated={isRootAuthenticated} />}>
            <Route element={<RootAppLayout />}>
              <Route index element={<Navigate replace to="rootDashboard" />} />
              <Route path="rootDashboard" element={<RootDashboard />} />
            </Route>
            <Route path="/editAdmin/:id" element={<EditAdmin />} />
            <Route path="addAdmin" element={<AddAdmin />} />
          </Route>

          {/* 404 页面 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
