import { Post } from "./post";
import { useHomeTimeline } from "./hooks";

export const HomeTimeline = () => {
  const { statusList } = useHomeTimeline();

  return (
    <>
      {statusList.map((status) => (
        <>
          <Post key={status.id} status={status} />
          <hr />
        </>
      ))}
    </>
  );
};
