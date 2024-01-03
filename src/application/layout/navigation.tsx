import { FunctionalComponent } from "preact";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "preact/hooks";

import { getAuthInfo } from "../auth/index.ts";

import styles from "./styles.module.css";

export const Navigation: FunctionalComponent = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setShow(false);
  }, [location]);

  const { server } = getAuthInfo();

  if (!server) {
    return null;
  }

  return (
    <nav role="navigation">
      <button className={styles.nav} onClick={() => setShow((s) => !s)}>
        ≡
      </button>
      <ul
        className={styles.menu}
        style={{
          display: show ? "block" : "none",
        }}
      >
        <li>
          <NavLink to={"/home"}>home</NavLink>
        </li>
        <li>
          <NavLink to={"/public"}>public</NavLink>
        </li>
        <li>
          <NavLink to={"/compose"}>post</NavLink>
        </li>
      </ul>
    </nav>
  );
};
