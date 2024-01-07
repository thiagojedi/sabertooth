import { useNavigate, useParams } from "react-router-dom";

import { ComposeForm } from "../modules/compose/compose-form/index.tsx";
import { useCurrentUser, usePreferences } from "../modules/users/hooks.ts";
import { useStatus } from "../modules/timelines/hooks/use-status.ts";
import { DebugLog } from "../common/components/error/index.tsx";

const ComposeRoute = () => {
  const { replyId } = useParams();

  const { data: reply } = useStatus(replyId);

  const { userData } = useCurrentUser();

  const preferences = usePreferences();

  const mentionedAccounts =
    reply?.mentions.map((mention) => mention.acct) ?? [];

  const defaultMentioned = [reply?.account.acct, ...mentionedAccounts]
    .filter((mention) => mention && mention !== userData?.acct)
    .map((mention) => `@${mention}`)
    .join(" ");

  const navigate = useNavigate();
  return (
    <>
      <ComposeForm
        initialData={{
          cw: reply?.spoiler_text,
          text: defaultMentioned,
          visibility: preferences?.["posting:default:visibility"],
        }}
        onSubmit={() => navigate(-1)}
        additionalInputs={
          <>
            {replyId && (
              <input type="hidden" name="in_reply_to_id" value={replyId} />
            )}
            <input
              type="hidden"
              name="language"
              value={
                reply?.language ?? preferences?.["posting:default:language"]
              }
            />
          </>
        }
      />
      <DebugLog info={preferences} />
    </>
  );
};

export default ComposeRoute;
