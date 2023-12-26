import { Post } from "./post";
import { useHomeTimeline } from "./hooks";

export const HomeTimeline = () => {
  const { statusList } = useHomeTimeline();

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
