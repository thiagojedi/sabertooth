import { Post } from "./post";
import { usePublicTimelineStatus } from "./hooks";

export const PublicTimeline = () => {
  const { statusList } = usePublicTimelineStatus();

  return (
    <>
      {statusList.map((status) => (
        <Post key={status.id} status={status} />
      ))}
    </>
  );
};
