import { useLogout } from "../application/hooks.ts";

const Logout = () => {
  useLogout(true);

  return null;
};

export default Logout;
