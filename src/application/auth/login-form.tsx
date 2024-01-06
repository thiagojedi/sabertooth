import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";

import { useCurrentUser } from "../../modules/users/hooks.ts";

import { authApp } from "./index.ts";
import { useAuthCallback } from "./use-auth-callback.tsx";

export const LoginForm: FunctionalComponent = () => {
  useAuthCallback();

  const [server, setServer] = useState("");

  const navigate = useNavigate();
  const user = useCurrentUser();
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        return authApp(server);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <label htmlFor="server">
          <small>Login to your server:</small>
        </label>
        <input
          type="text"
          name="server"
          placeholder="i.e. mastodon.social"
          value={server}
          autoCapitalize="off"
          onChange={(e) => setServer(e.currentTarget.value)}
          style={{ margin: "0.5rem auto" }}
        />

        <input type="submit" value="Login" />
      </div>
    </form>
  );
};
