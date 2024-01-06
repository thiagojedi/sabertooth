import { useEffect } from "preact/hooks";

import { getToken } from "./index.ts";

export const useAuthCallback = () => {
  const params = new URL(window.location.href).searchParams;
  const code = params.get("code");

  useEffect(() => {
    if (code) {
      getToken(code).then(() => {
        window.location.search = "";
      });
    }
  }, [code]);
};
