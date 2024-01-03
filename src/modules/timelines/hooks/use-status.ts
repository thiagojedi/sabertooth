import useSWR from "swr";

import { RequestError } from "../../../common/errors.ts";

export const useStatus = (id?: string) =>
  useSWR<Status, RequestError>(() => (id ? "/api/v1/statuses/" + id : null));
