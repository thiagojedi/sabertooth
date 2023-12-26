import { FunctionalComponent } from "preact";
import { PostHeader } from "../../../common/components/post-header";
import { PostFooter } from "../../../common/components/post-footer";

import styles from "./styles.module.css";

export const Post: FunctionalComponent<{ status: Status }> = ({ status }) => {
  const consideredStatus = status.reblog ?? status;

  const content = (
    <div dangerouslySetInnerHTML={{ __html: consideredStatus.content }} />
  );

  return (
    <section key={status.id} className={styles.post}>
      {status.reblog && <small>boosted by {status.account.display_name}</small>}
      {status.in_reply_to_id && <small>↩ reply</small>}
      <PostHeader
        handle={consideredStatus.account.acct}
        name={consideredStatus.account.display_name}
        url={consideredStatus.account.avatar_static}
      />
      {status.spoiler_text ? (
        <details>
          <summary>{status.spoiler_text}</summary>
          {content}
        </details>
      ) : (
        content
      )}
      <PostFooter status={consideredStatus} />
    </section>
  );
};
