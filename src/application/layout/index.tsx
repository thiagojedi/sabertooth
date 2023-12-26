import { FunctionalComponent } from "preact";

import styles from "./styles.module.css";
import { Avatar } from "../../common/components/avatar";
import { logout } from "../auth";
import { useNavigate } from "react-router-dom";

import { useAuthCallback } from "../auth/use-auth-callback.tsx";

const placeholderImage =
  "https://media.mastodon.com.br/accounts/avatars/111/337/464/121/681/509/original/85bb84897dae35b9.jpg";

export const Layout: FunctionalComponent = ({ children }) => {
  useAuthCallback();

  const navigate = useNavigate();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.avatar}>
          <Avatar name="Test" url={placeholderImage} />
        </div>
        <div className={styles.title}>SaberTooth</div>
        <div>
          <button
            onClick={() => {
              logout().then(() => navigate("/"));
            }}
            title="Logout"
          >
            📵
          </button>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};
