import { getAuthInfo } from "../../application/auth";

export const getFetcher = () => {
  const { server, token } = getAuthInfo();

  if (!server) {
    return undefined;
  }

  return async (
    key: string,
    method: "GET" | "POST" = "GET",
    data?: Record<string, string>,
  ) => {
    const request = await fetch(`https://${server}${key}`, {
      method,
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
      body: data && new URLSearchParams(data),
    });

    if (request.ok) {
      return request.json();
    }

    const response = await request.json();
    throw new Error(response.error);
  };
};
