import { FunctionalComponent } from "preact";
import { useCallback, useState } from "preact/hooks";

import { voteOnPoll } from "../services/index.ts";
import { PollOptions } from "../../../common/components/poll/index.tsx";

export const PostPoll: FunctionalComponent<{ poll: Poll }> = ({ poll }) => {
  const [consideredPoll, setConsideredPoll] = useState(poll);

  const handleVote = useCallback(
    (votes: FormData) => {
      voteOnPoll(consideredPoll.id, votes).then(setConsideredPoll);
    },
    [consideredPoll.id],
  );

  return <PollOptions poll={consideredPoll} onVote={handleVote} />;
};
