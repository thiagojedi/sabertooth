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

  const { data: userData, error } = useSWR<Account>(
    config?.token && "/api/v1/accounts/verify_credentials",
    {
      shouldRetryOnError: (error: RequestError) => error.status !== 401,
      onError: logout,
    },
  );

  return error ? undefined : userData;
};
