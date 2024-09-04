import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <Router>
      <div>
        {/* 导航链接 */}
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/about">Users</Link>
            </li>
            <li>
              <Link to="/userDetail">UserDetail</Link>
            </li>
          </ul>
        </nav>

        {/* 定义路由 */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<Users />} />
          <Route path="/userDetail" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
