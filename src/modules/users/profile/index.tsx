import { FunctionalComponent } from "preact";

import { Avatar } from "../../../common/components/avatar";
import { emojiText } from "../../../common/helpers/emoji-text.ts";

import styles from "./styles.module.css";

type Props = { user: Account };

export const UserProfile: FunctionalComponent<Props> = ({ user }) => (
  <>
    <img className={styles.header} src={user.header_static} alt="" />
    <header className={styles.profile}>
      <div className={styles.avatar}>
        <Avatar name={user.display_name} url={user.avatar_static} />
      </div>
      <div className={styles.name}>
        <h1
          dangerouslySetInnerHTML={{
            __html: emojiText(user.display_name, user.emojis),
          }}
        />
        <small>@{user.acct}</small>
      </div>

      <details className={styles.info}>
        <summary>View Info</summary>
        <span
          dangerouslySetInnerHTML={{
            __html: emojiText(user.note, user.emojis),
          }}
        />
      </details>
      <div className={styles.followers}>
        <b>
          <small>Followers</small>
        </b>
        <span>{user.followers_count}</span>
      </div>
      <div className={styles.following}>
        <b>
          <small>Following</small>
        </b>
        <span>{user.following_count}</span>
      </div>
      <div className={styles.stats}>
        <b>
          <small>Toots</small>
        </b>
        <span>{user.statuses_count}</span>
      </div>
    </header>
  </>
);
