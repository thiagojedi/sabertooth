import { FunctionalComponent } from "preact";
import { PostHeader } from "../../../common/components/post-header";
import { PostFooter } from "../../../common/components/post-footer";

import styles from "./styles.module.css";

export const Post: FunctionalComponent<{ status: Status }> = ({ status }) => (
  <section key={status.id} className={styles.post}>
    <PostHeader
      handle={status.account.acct}
      name={status.account.display_name}
      url={status.account.avatar_static} />
    <p dangerouslySetInnerHTML={{ __html: status.content }} />
    <PostFooter status={status} />
  </section>
);
