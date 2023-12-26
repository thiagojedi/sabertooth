import { FunctionalComponent } from "preact";
import { PostHeader } from "../../../common/components/post-header";
import { PostFooter } from "../../../common/components/post-footer";

import styles from "./styles.module.css";
import { MediaCarousel } from "../../../common/components/media-carousel";
import { emojiText } from "../../../common/helpers/emoji-text.ts";

export const Post: FunctionalComponent<{ status: Status }> = ({ status }) => {
  const consideredStatus = status.reblog ?? status;

  const content = (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: emojiText(consideredStatus.content, consideredStatus.emojis),
        }}
      />

      <MediaCarousel media={consideredStatus.media_attachments} />
    </>
  );

  return (
    <section key={status.id} className={styles.post}>
      {status.reblog && (
        <small
          dangerouslySetInnerHTML={{
            __html: `boosted by ${emojiText(
              status.account.display_name,
              status.account.emojis,
            )}`,
          }}
        />
      )}
      {status.in_reply_to_id && <small>↩ reply</small>}
      <PostHeader
        handle={consideredStatus.account.acct}
        name={emojiText(
          consideredStatus.account.display_name,
          consideredStatus.account.emojis,
        )}
        url={consideredStatus.account.avatar_static}
      />
      <div className={styles.body}>
        {status.spoiler_text ? (
          <details>
            <summary>{status.spoiler_text}</summary>
            {content}
          </details>
        ) : (
          content
        )}
      </div>
      <PostFooter status={consideredStatus} />
    </section>
  );
};
