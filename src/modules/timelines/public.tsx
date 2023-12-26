import { usePublicTimeline } from "./hooks";
import { Post } from "./post";

export const PublicTimeline = () => {
  const { statusList } = usePublicTimeline();

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
