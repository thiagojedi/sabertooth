import { FunctionalComponent } from "preact";

import styles from "./styles.module.css";
import { Avatar } from "../../common/components/avatar";
import { getAuthInfo, logout } from "../auth";
import { LoginForm } from "../auth/login-form.tsx";

const placeholderImage =
  "https://media.mastodon.com.br/accounts/avatars/111/337/464/121/681/509/original/85bb84897dae35b9.jpg";

export const Layout: FunctionalComponent = ({ children }) => {
  const { server } = getAuthInfo();

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
              logout().then(() => location.reload());
            }}
            title="Logout"
          >
            📵
          </button>
        </div>
      </header>
      <main>{server ? children : <LoginForm />}</main>
    </>
  );
};
