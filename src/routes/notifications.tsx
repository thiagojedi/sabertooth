import { DebugLog } from "../common/components/error/index.tsx";
import { useNotifications } from "../modules/notifications/hooks.ts";
import { NotificationList } from "../modules/notifications/notifications-list.tsx";

const NotificationsRoute = () => {
  const { data, error } = useNotifications();

  return (
    <>
      {error && <DebugLog info={error} />}
      <NotificationList notifications={data ?? []} />
    </>
  );
};

export default NotificationsRoute;
