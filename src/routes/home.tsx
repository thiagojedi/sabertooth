import { useTimeline } from "../modules/timelines/hooks";
import { Timeline } from "../modules/timelines/timeline.tsx";

const HomeRoute = () => {
  const { statusList } = useTimeline();

  return <Timeline statusList={statusList} />;
};

export default HomeRoute;
