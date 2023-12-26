import { FunctionalComponent } from "preact";

import styles from "./styles.module.css";

export const PostFooter: FunctionalComponent<{ status: Status }> = ({
  status,
}) => {
  return (
    <footer className={styles.footer}>
      <button onClick={() => {}}>↩ {status.replies_count}</button>
      <button onClick={() => {}}>
        {status.favourited ? "★" : "☆"} {status.favourites_count}
      </button>
      <button onClick={() => {}}>
        {status.reblogged ? "🔂" : "🔁"} {status.reblogs_count}
      </button>
    </footer>
  );
};
