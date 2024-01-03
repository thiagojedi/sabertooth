import { useNavigate, useParams } from "react-router-dom";

import { ComposeForm } from "../modules/compose/compose-form/index.tsx";
import { useCurrentUser } from "../modules/users/hooks.ts";
import { useStatus } from "../modules/timelines/hooks/use-status.ts";

const ComposeRoute = () => {
  const { replyId } = useParams();

  const { data: status } = useStatus(replyId);

  const currentUser = useCurrentUser();

  const mentionedAccounts =
    status?.mentions.map((mention) => mention.acct) ?? [];

  const defaultMentioned = [status?.account.acct, ...mentionedAccounts]
    .filter((mention) => mention && mention !== currentUser?.acct)
    .map((mention) => `@${mention}`)
    .join(" ");

  const navigate = useNavigate();
  return (
    <>
      <ComposeForm
        initialData={{
          cw: status?.spoiler_text,
          text: defaultMentioned,
        }}
        additionalInputs={
          <>
            {replyId && (
              <input type="hidden" name="in_reply_to_id" value={replyId} />
            )}
          </>
        }
        onSubmit={() => navigate(-1)}
      />
    </>
  );
};

export default ComposeRoute;
