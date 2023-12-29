import { useParams } from "react-router-dom";
import useSWR from "swr";

import { DebugLog } from "../common/components/error";
import { Timeline } from "../modules/timelines/timeline.tsx";
import { Post } from "../modules/timelines/post";
import { RequestError } from "../common/errors.ts";

const PostRoute = () => {
  const { postId } = useParams();

  const { data: status, error } = useSWR<Status, RequestError>(() =>
    postId ? "/api/v1/statuses/" + postId : null,
  );

  const { data: context } = useSWR<Context>(() =>
    postId ? `/api/v1/statuses/${postId}/context` : null,
  );

  if (error?.status === 404) {
    throw error;
  }

  if (error) {
    return <DebugLog info={error} />;
  }

  return (
    <>
      {status && <Post status={status} />}
      <hr />
      <Timeline statusList={context?.descendants ?? []} />
    </>
  );
};

export default PostRoute;
