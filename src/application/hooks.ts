import useSWRImmutable from "swr/immutable";
import { getAuthInfo } from "./auth";

export const useAppConfig = () =>
  useSWRImmutable("app-config", () => getAuthInfo());
