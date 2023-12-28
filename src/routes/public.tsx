import { useTimeline } from "../modules/timelines/hooks";
import { Timeline } from "../modules/timelines/timeline.tsx";

const PublicRoute = () => {
  const { statusList } = useTimeline("public");

  return <Timeline statusList={statusList} />;
};

export default PublicRoute;
