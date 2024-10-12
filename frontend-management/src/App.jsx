import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import AddAdmin from "./pages/AddAdmin";
import Dashboard from "./pages/Dashboard";
import RootDashboard from "./pages/rootDashboard";
import Users from "./pages/Members";
import Account from "./pages/Account";
import Login from "./pages/Login";
import RootLogin from "./pages/rootLogin"; // 将导入的 rootLogin 修改为 RootLogin
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";
import RootAppLayout from "./components/RootAppLayout";
import EditAdmin from "./pages/EditAdmin";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route element={<RootAppLayout />}>
            <Route index element={<Navigate replace to="Rootdashboard" />} />
            <Route path="rootDashboard" element={<RootDashboard />} />
          </Route>
          <Route path="/editAdmin/:id" element={<EditAdmin />} />
          <Route path="addAdmin" element={<AddAdmin />} />
          <Route path="rootlogin" element={<RootLogin />} /> {/* 修改为大写 */}
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
