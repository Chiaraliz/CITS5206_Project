import Intro from "../features/login/Intro";
import LoginSection from "../features/login/LoginSection";
import ApiTest from "../services/ApiTest";
function Login() {
  return (
    <div className="flex h-screen">
      <LoginSection />
      <Intro />
      <ApiTest />
    </div>
  );
}

export default Login;
