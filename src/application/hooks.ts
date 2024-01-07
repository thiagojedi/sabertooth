import useSWRImmutable from "swr/immutable";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "preact/hooks";

import { getAuthInfo, logout } from "./auth/index.ts";

export const useAppConfig = () => {
  const { data, mutate } = useSWRImmutable("app-config", () => getAuthInfo());
  return { config: data, clearConfig: () => mutate() };
};

export const useLogout = (instant = false) => {
  const navigate = useNavigate();

  const { clearConfig } = useAppConfig();

  const logoutCb = useCallback(
    () =>
      logout()
        .then(() => clearConfig())
        .then(() => navigate("/", { replace: true })),
    [],
  );

  useEffect(() => {
    if (instant) {
      logoutCb();
    }
  }, [instant]);

  return logoutCb;
};

export const useServerInfo = (server?: string) => {
  const { config } = useAppConfig();

  const { data } = useSWRImmutable<ServerInfo>(
    () => `https://${server ?? config!.server}/api/v1/instance`,
    (url: string) => fetch(url).then((r) => r.json()),
  );

  return data;
};

export const useServerPreferences = () => useServerInfo()?.configuration;
