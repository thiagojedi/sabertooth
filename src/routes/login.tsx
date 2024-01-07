import { Fragment } from "preact";
import { useNavigate } from "react-router-dom";
import { useEffect } from "preact/hooks";

import { LoginForm } from "../application/auth/login-form.tsx";
import { WelcomeInfo } from "../application/layout/welcome-info/index.tsx";
import { useCurrentUser } from "../modules/users/hooks.ts";

const Login = () => {
  const navigate = useNavigate();
  const { userData, isLoading } = useCurrentUser();
  useEffect(() => {
    if (userData) {
      navigate("/home", { replace: true });
    }
  }, [navigate, userData]);

  if (isLoading || userData) {
    return null;
  }

  return (
    <Fragment>
      <WelcomeInfo />
      <LoginForm />
    </Fragment>
  );
};

export default Login;
