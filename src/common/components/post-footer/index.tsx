import { FunctionalComponent } from "preact";

import styles from "./styles.module.css";

type Props = {
  status: {
    favourited: boolean;
    favourites_count: number;
    reblogged: boolean;
    reblogs_count: number;
    replies_count: number;
  };
  onClick?: (event: "fav" | "boost" | "reply", value?: boolean) => void;
};

export const PostFooter: FunctionalComponent<Props> = ({ status, onClick }) => {
  const disabled = typeof onClick === "undefined";
  const callback = onClick ?? (() => {});
  return (
    <footer className={styles.footer}>
      <button disabled={disabled} onClick={() => callback("reply")}>
        ↩ {status.replies_count}
      </button>
      <button
        disabled={disabled}
        onClick={() => callback("fav", !status.favourited)}
      >
        {status.favourited ? "★" : "☆"} {status.favourites_count}
      </button>
      <button
        disabled={disabled}
        onClick={() => callback("boost", !status.reblogged)}
      >
        {status.reblogged ? "🔂" : "🔁"} {status.reblogs_count}
      </button>
    </footer>
  );
};
