import { Post } from "./post";
import { usePublicTimelineStatus } from "./hooks";

export const PublicTimeline = () => {
  const { statusList } = usePublicTimelineStatus();

  return (
    <>
      {statusList
        .filter((status) => status.media_attachments.length === 0) // Remove when handling media
        .map((status) => (
          <>
            <Post key={status.id} status={status} />
            <hr />
          </>
        ))}
    </>
  );
};
