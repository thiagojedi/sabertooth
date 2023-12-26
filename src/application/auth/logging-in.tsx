import { useSearchParams } from "react-router-dom";
import { useEffect } from "preact/hooks";
import { getToken } from "./index.ts";

export const LoggingIn = () => {
  const [url] = useSearchParams();
  const code = url.get("code");

  useEffect(() => {
    if (code)
      getToken(code).then(() => {
        window.location.pathname = "/";
      });
  }, [code]);

  return <div>Logging in...</div>;
};
