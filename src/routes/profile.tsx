import { FunctionalComponent } from "preact";
import { useParams } from "react-router-dom";

import { UserProfile } from "../modules/users/profile";
import { useUserTimeline } from "../modules/timelines/hooks";
import { Timeline } from "../modules/timelines/timeline.tsx";
import { DebugLog } from "../common/components/error";
import { useAccountInfo } from "../modules/users/hooks.ts";

const ProfileRoute: FunctionalComponent = () => {
  const { acct } = useParams();

  const { account, error } = useAccountInfo(acct);

  const { statusList } = useUserTimeline(account?.id);

  if (error) {
    return <DebugLog info={error} />;
  }

  return (
    <>
      {account && <UserProfile user={account} />}

      <hr />

      <Timeline statusList={statusList} />
    </>
  );
};

export default ProfileRoute;
