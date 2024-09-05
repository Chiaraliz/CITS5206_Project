import Logo from "../../ui/Logo";
import LoginForm from "./LoginForm";

function LoginSection() {
  return (
    <div className="flex-1 flex flex-col justify-center gap-5 px-20">
      <Logo />
      <h1 className="text-3xl text-[#048492] font-bold text-center">
        Sign in to manage your membership
      </h1>
      <p className="text-center">Not a member? Subscribe now!</p>
      <LoginForm />
    </div>
  );
}

export default LoginSection;
