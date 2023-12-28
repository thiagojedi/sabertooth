import useSWR from "swr";

export const useUserTimeline = (userId?: string) => {
  const { data = [] } = useSWR(() =>
    userId ? "/api/v1/accounts/" + userId + "/statuses" : null,
  );

  return { statusList: data };
};
