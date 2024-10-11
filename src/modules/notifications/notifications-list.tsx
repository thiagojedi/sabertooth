import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { Fragment, FunctionalComponent as FC } from "preact";
import { Link } from "react-router-dom";

import { emojiText } from "../../common/helpers/emoji-text.ts";
import { getPostPath } from "../../common/helpers/navigation.ts";

import styles from "./styles.module.css";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

type Props = {
  notifications: MastodonNotification[];
};

const Mention: FC<{ notification: MastodonNotification }> = ({
  notification,
}) =>
  notification.status && (
    <Fragment>
      <span
        dangerouslySetInnerHTML={{
          __html: emojiText(
            notification.account.display_name,
            notification.account.emojis,
          ),
        }}
      />{" "}
      <Link to={getPostPath(notification.status)}>mentioned</Link> you{" "}
      {dayjs(notification.created_at).fromNow()}
    </Fragment>
  );

const PollFinished: FC<{ notification: MastodonNotification }> = ({
  notification,
}) =>
  notification.status && (
    <span>
      A <Link to={getPostPath(notification.status)}>poll</Link> you voted
      finished {dayjs(notification.created_at).fromNow()}
    </span>
  );

export const NotificationList: FC<Props> = ({ notifications: data }) => (
  <ul className={styles.list}>
    {data
      .filter((notification) => notification.status)
      .map((notification) => (
        <Fragment key={notification.id}>
          {notification.type === "mention" && (
            <Mention notification={notification} />
          )}
          {notification.type === "poll" && (
            <PollFinished notification={notification} />
          )}
          <br />
          <small
            className={styles.username}
            title={"@" + notification.account.acct}
          >
            @{notification.account.acct}
          </small>
          <br />
          <small>{dayjs(notification.created_at).format("L LT")}</small>
          <hr />
        </Fragment>
      ))}
  </ul>
);
