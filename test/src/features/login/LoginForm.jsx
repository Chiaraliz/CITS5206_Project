import { useState } from "react";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
// import { useNavigate } from "react-router-dom";
// import apiService from "../../services/apiService";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const navigate = useNavigate();

  // const handleClick = async (e) => {
  //   e.preventDefault();

  //   setError(null);
  //   setIsLoading(true);

  //   try {
  //     const response = await apiService.login({
  //       email,
  //       password,
  //       rememberMe,
  //     });
  //     console.log(response);

  //     // const { token } = response.data;

  //     // localStorage.setItem("token", token);

  //     // navigate("/user");
  //   } catch (error) {
  //     // 处理错误并显示错误消息
  //     console.error("Login error:", error);
  //     setError("Invalid email or password. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  // };

  return (
    <form className="xl:px-20 mt-5 flex flex-col gap-5 w-2/3 mx-auto">
      <FormRow label="Email" type="vertical">
        <input
          type="email"
          value={email}
          id="email"
          name="email"
          className="border rounded-lg shadow h-9 outline-red-500 px-2"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" type="vertical">
        <input
          type="password"
          value={password}
          id="password"
          name="password"
          className="border rounded-lg shadow h-9 outline-red-500 px-2"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow>
        <Checkbox
          label="Remember me"
          value={rememberMe}
          setValue={setRememberMe}
        />
      </FormRow>
      <FormRow type="vertical">
        <Button type="login">Login</Button>
      </FormRow>
    </form>
  );
}

export default LoginForm;
