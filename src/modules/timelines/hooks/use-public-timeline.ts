import useSWR from "swr";

export const usePublicTimeline = () => {
  const { data = [] } = useSWR<Status[]>("/api/v1/timelines/public");

  return { statusList: data };
};
