import { FunctionalComponent } from "preact";

import styles from "./styles.module.css";

export const PostFooter: FunctionalComponent<{ status: Status }> = (props) => {
  return (
    <footer className={styles.footer}>
      <span>Replies {props.status.replies_count}</span>
      <span>Favs {props.status.favourites_count}</span>
      <span>Boosts {props.status.reblogs_count}</span>{" "}
    </footer>
  );
};
