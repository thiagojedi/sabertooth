import { useNavigate } from "react-router-dom";
import { useEffect } from "preact/hooks";
import { getAuthInfo, getToken } from "./index.ts";

export const useAuthCallback = () => {
  const params = new URL(window.location.href).searchParams;
  const code = params.get("code");

  const navigate = useNavigate();

  useEffect(() => {
    if (code)
      getToken(code).then(() => {
        window.location.search = "";
      });
  }, [code]);

  useEffect(() => {
    const { token } = getAuthInfo();
    if (token) {
      navigate("/home", {
        replace: true,
      });
    }
  }, []);
};
