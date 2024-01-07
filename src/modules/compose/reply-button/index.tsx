import { FunctionalComponent } from "preact";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

export const ReplyButton: FunctionalComponent<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <button
      className={styles.replyButton}
      onClick={() => navigate(`/reply/${id}`)}
    >
      Reply
    </button>
  );
};
