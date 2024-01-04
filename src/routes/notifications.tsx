import useSWR from "swr";
import { Link } from "react-router-dom";
import { Fragment } from "preact";

import { getPostPath } from "../common/helpers/navigation.ts";
import { DebugLog } from "../common/components/error/index.tsx";
import { emojiText } from "../common/helpers/emoji-text.ts";

const NotificationsRoute = () => {
  const { data, error } = useSWR<MastodonNotification[]>(
    "/api/v1/notifications",
  );

  return (
    <>
      {error && <DebugLog info={error} />}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {data
          ?.filter(({ type }) => type === "mention")
          .map((n) => (
            <Fragment key={n.id}>
              <li>
                {emojiText(n.account.display_name, n.account.emojis)}{" "}
                <small>(@{n.account.acct})</small>{" "}
                <Link to={getPostPath(n.status)}>mentioned</Link> you
              </li>
              <hr />
            </Fragment>
          ))}
      </ul>
    </>
  );
};

export default NotificationsRoute;
