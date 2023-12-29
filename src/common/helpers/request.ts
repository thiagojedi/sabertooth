import { getAuthInfo } from "../../application/auth";
import { RequestError } from "../errors.ts";

export const getFetcher = ({ server, token } = getAuthInfo()) => {
  if (!server) {
    return undefined;
  }

  return async (
    key: string,
    method: "GET" | "POST" = "GET",
    data?: Record<string, string>,
  ) => {
    const response = await fetch(`https://${server}${key}`, {
      method,
      headers: {
        Authorization: token && `Bearer ${token}`,
        Accept: "application/json, text/plain, */*",
      },
      body: data && new URLSearchParams(data),
    });

    if (response.ok) {
      return response.json();
    }

    throw new RequestError(response.status, await response.json());
  };
};
