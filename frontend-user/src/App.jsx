import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Subscription from "./pages/Subscription";
import AppLayout from "./ui/AppLayout";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ui/ProtectedRoute";
import SuccessPage from "./pages/SuccessPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            index
            element={<Navigate repalce to="userProfile/:userId" />}
          />
          <Route
            path="userProfile/:userId"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="signup" element={<Signup />} />
        <Route path="SuccessPage" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
