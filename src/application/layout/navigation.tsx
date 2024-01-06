import { FunctionalComponent } from "preact";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "preact/hooks";

import { getAuthInfo } from "../auth/index.ts";

import styles from "./styles.module.css";

type Props = {
  routes: Array<Partial<{ path: string; id: string }>>;
};

export const Navigation: FunctionalComponent<Props> = ({ routes }) => {
  const { server } = getAuthInfo();

  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    if (path && path !== "/") {
      navigate(path);
      setPath("");
    }
  }, [navigate, path]);

  if (!server) {
    return null;
  }

  return (
    <select
      role="navigation"
      className={styles.navigation}
      value=""
      onChange={(e) => setPath(e.currentTarget.value)}
    >
      <option value="" disabled>
        menu
      </option>
      {routes
        .filter((route) => route.id && route.path)
        .map((route) => (
          <option key={route.path} value={route.path}>
            {route.id}
          </option>
        ))}
    </select>
  );
};
