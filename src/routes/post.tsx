import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useEffect, useRef } from "preact/hooks";

import { DebugLog } from "../common/components/error/index.tsx";
import { Timeline } from "../modules/timelines/timeline.tsx";
import { ReplyButton } from "../modules/compose/reply-button/index.tsx";
import { useStatus } from "../modules/timelines/hooks/use-status.ts";

const PostRoute = () => {
  const { postId } = useParams();

  const { data: status, error } = useStatus(postId);

  const { data: context, isLoading } = useSWR<Context>(() =>
    postId ? `/api/v1/statuses/${postId}/context` : null,
  );

  const replyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      replyRef.current?.scrollIntoView();
    }
  }, [isLoading]);

  if (error?.status === 404) {
    throw error;
  }

  if (error) {
    return <DebugLog info={error} />;
  }

  return (
    <>
      <Timeline statusList={context?.ancestors ?? []} />
      <div ref={replyRef}>
        <Timeline statusList={status ? [status] : []} />
      </div>
      {status && <ReplyButton id={status.id} />}
      <Timeline statusList={context?.descendants ?? []} />
    </>
  );
};

export default PostRoute;
