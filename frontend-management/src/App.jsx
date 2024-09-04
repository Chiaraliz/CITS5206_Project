import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import AppLayout from "./components/AppLayout";
import Account from "./pages/Account";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
