import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import LoginForm from "./LoginForm";

function LoginSection() {
  return (
    <div className="flex-1 flex flex-col justify-center gap-5 xl:px-20">
      <Logo />
      <h1 className="xl:text-3xl text-xl text-[#048492] font-bold text-center">
        Sign in to manage your membership
      </h1>
      <p className="text-center">
        Not a member?{" "}
        <Link
          to="/signup"
          className="text-[#F5B559] font-bold hover:text-yellow-500"
        >
          Subscribe now!
        </Link>
      </p>
      <LoginForm />
    </div>
  );
}

export default LoginSection;
