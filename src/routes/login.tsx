import { Fragment } from "preact";

import { LoginForm } from "../application/auth/login-form.tsx";
import { WelcomeInfo } from "../application/layout/welcome-info/index.tsx";

const Login = () => (
  <Fragment>
    <WelcomeInfo />
    <LoginForm />
  </Fragment>
);

export default Login;
