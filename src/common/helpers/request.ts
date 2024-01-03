import { getAuthInfo } from "../../application/auth/index.ts";
import { RequestError } from "../errors.ts";

export const getFetcher = ({ server, token } = getAuthInfo()) => {
  if (!server) {
    return undefined;
  }

  async function fetcher<T = unknown>(
    key: string,
    method: "POST",
    data?: Record<string, string> | FormData,
  ): Promise<T>;
  async function fetcher<T = unknown>(
    key: string,
    method: "GET",
    data: undefined,
  ): Promise<T>;
  async function fetcher<T = unknown>(
    key: string,
    method: "GET" | "POST" = "GET",
    data?: Record<string, string> | FormData,
  ): Promise<T> {
    const response = await fetch(`https://${server}${key}`, {
      method,
      headers: {
        Authorization: token && `Bearer ${token}`,
        Accept: "application/json, text/plain, */*",
      },
      body: data && new URLSearchParams(data as Record<string, string>),
    });

    if (response.ok) {
      return response.json();
    }

    throw new RequestError(response.status, await response.json());
  }

  return fetcher;
};
