import Intro from "../features/login/Intro";
import LoginSection from "../features/login/LoginSection";
function Login() {
  return (
    <div className="flex h-screen">
      <LoginSection />
      <Intro />
    </div>
  );
}

export default Login;
