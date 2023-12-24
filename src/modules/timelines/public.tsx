import { useState, useEffect } from "preact/hooks";
import { Post } from "./post";

const server = "mastodon.com.br";

export const PublicTimeline = () => {
  const [statusList, setStatusList] = useState<Status[]>([]);

  useEffect(() => {
    fetch(`https://${server}/api/v1/timelines/public`)
      .then((r) => r.json())
      .then(setStatusList);
  }, []);

  return (
    <>
      {statusList.map((status) => (
        <Post key={status.id} status={status} />
      ))}
    </>
  );
};
