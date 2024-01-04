import useSWR from "swr";
import { Link } from "react-router-dom";
import { Fragment } from "preact";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getPostPath } from "../common/helpers/navigation.ts";
import { DebugLog } from "../common/components/error/index.tsx";
import { emojiText } from "../common/helpers/emoji-text.ts";

dayjs.extend(relativeTime);

const NotificationsRoute = () => {
  const { data, error } = useSWR<MastodonNotification[]>(
    "/api/v1/notifications",
  );

  return (
    <>
      {error && <DebugLog info={error} />}
      <ul style={{ listStyle: "none", padding: "0 0.5rem" }}>
        {data
          ?.filter(({ type }) => type === "mention")
          .map((n) => (
            <Fragment key={n.id}>
              <li>
                <span
                  dangerouslySetInnerHTML={{
                    __html: emojiText(n.account.display_name, n.account.emojis),
                  }}
                />{" "}
                <Link to={getPostPath(n.status)}>mentioned</Link> you{" "}
                {dayjs(n.created_at).fromNow()}
                <br />
                <small>@{n.account.acct}</small>
                <br />
                <small>{dayjs(n.created_at).toString()}</small>
              </li>
              <hr />
            </Fragment>
          ))}
      </ul>
    </>
  );
};

export default NotificationsRoute;
