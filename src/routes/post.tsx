import { useParams } from "react-router-dom";
import useSWR from "swr";

import { DebugLog } from "../common/components/error/index.tsx";
import { Timeline } from "../modules/timelines/timeline.tsx";
import { ReplyButton } from "../modules/compose/reply-button/index.tsx";
import { useStatus } from "../modules/timelines/hooks/use-status.ts";

const PostRoute = () => {
  const { postId } = useParams();

  const { data: status, error } = useStatus(postId);

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
      <Timeline statusList={status ? [status] : []} />
      {status && <ReplyButton id={status.id} />}
      <Timeline statusList={context?.descendants ?? []} />
    </>
  );
};

export default PostRoute;
