import useSWR from "swr";

export const useTimeline = (type: "home" | "public" = "home") => {
  const { data = [], error } = useSWR<Status[]>("/api/v1/timelines/" + type);

  return { statusList: data, error };
};
