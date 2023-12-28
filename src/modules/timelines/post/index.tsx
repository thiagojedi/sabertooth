import { FunctionalComponent } from "preact";

import { PostHeader } from "../../../common/components/post-header";
import { MediaCarousel } from "../../../common/components/media-carousel";
import { emojiText } from "../../../common/helpers/emoji-text.ts";
import { PostActions } from "../post-actions";
import { useMentionLinks } from "../hooks/use-mention-links.ts";

import styles from "./styles.module.css";

const Content = ({ status }: { status: Status }) => {
  const ref = useMentionLinks<HTMLDivElement>(status.mentions);
  return (
    <>
      <div
        ref={ref}
        dangerouslySetInnerHTML={{
          __html: emojiText(status.content, status.emojis),
        }}
      />

      {status.media_attachments.length > 0 && (
        <MediaCarousel media={status.media_attachments} />
      )}
    </>
  );
};

export const Post: FunctionalComponent<{ status: Status }> = ({ status }) => {
  const consideredStatus = status.reblog ?? status;

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
            <Content status={consideredStatus} />
          </details>
        ) : (
          <Content status={consideredStatus} />
        )}
      </div>
      <PostActions status={consideredStatus} />
    </section>
  );
};
