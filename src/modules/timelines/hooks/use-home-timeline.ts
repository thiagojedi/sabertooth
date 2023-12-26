import useSWR from "swr";

export const useHomeTimeline = () => {
  const { data = [], error } = useSWR<Status[]>("/api/v1/timelines/home");

  return { statusList: data, error };
};
