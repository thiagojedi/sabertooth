import { FunctionalComponent } from "preact";

import styles from "./styles.module.css";

import logo from "/logo.svg?url";

export const WelcomeInfo: FunctionalComponent = () => (
  <div className={styles.welcome}>
    <img className={styles.logo} src={logo} alt="SaberTooth" />
    <p>A small Mastodon application for very small screens</p>
  </div>
);
