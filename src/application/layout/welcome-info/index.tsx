import { FunctionalComponent } from "preact";

import styles from "./styles.module.css";

export const WelcomeInfo: FunctionalComponent = () => (
  <div className={styles.welcome}>
    <img className={styles.logo} src="/logo.svg?url" alt="SaberTooth" />
    <p>A small Mastodon application for very small screens</p>
  </div>
);
