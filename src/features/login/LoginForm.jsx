import { useState } from "react";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
