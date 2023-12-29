import useSWR from "swr";

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
