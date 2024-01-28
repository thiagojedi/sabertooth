import useSWR from "swr";

export const useNotifications = () =>
  useSWR<MastodonNotification[]>(
    "/api/v1/notifications?types[]=poll&types[]=mention",
  );
