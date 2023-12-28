import { FunctionalComponent } from "preact";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import { UserProfile } from "../modules/users/profile";
import { useUserTimeline } from "../modules/timelines/hooks";
import { Timeline } from "../modules/timelines/timeline.tsx";
import { ErrorLog } from "../common/components/error";

const ProfileRoute: FunctionalComponent = () => {
  const { acct } = useParams();

  const value = acct?.replace("@", "");

  const { data, error } = useSWR<Account>(
    "/api/v1/accounts/lookup?acct=" + value,
  );

  const { statusList } = useUserTimeline(data?.id);

  if (error) {
    return <ErrorLog error={error} />;
  }

  return (
    <>
      {data && <UserProfile user={data} />}

      <hr />

      <Timeline statusList={statusList} />
    </>
  );
};

export default ProfileRoute;
