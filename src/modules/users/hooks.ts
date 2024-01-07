import useSWR from "swr";

import { useAppConfig, useLogout } from "../../application/hooks.ts";

import type { RequestError } from "../../common/errors.ts";

/**
 * @param account Account identifier
 * @example
 *  useAccountInfo("@user@example.com")
 */
export const useAccountInfo = (account?: string) => {
  const { data, error } = useSWR<Account>(
    () => "/api/v1/accounts/lookup?acct=" + account!.replace("@", ""),
  );
  return { account: data, error };
};
export const useCurrentUser = () => {
  const logout = useLogout();

  const { config } = useAppConfig();

  const {
    data: userData,
    error,
    isLoading,
  } = useSWR<Account>(config?.token && "/api/v1/accounts/verify_credentials", {
    shouldRetryOnError: (error: RequestError) => error.status !== 401,
    onError: logout,
  });

  return { userData: error ? undefined : userData, isLoading };
};

type UserPreferences = {
  "posting:default:visibility": Visibility;
  "posting:default:sensitive": boolean;
  "posting:default:language": string;
  "reading:expand:media": "default";
  "reading:expand:spoilers": boolean;
};

export const usePreferences = () => {
  const { data } = useSWR<UserPreferences>("/api/v1/preferences");

  return data;
};
