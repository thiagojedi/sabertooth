import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { authApp } from "./index.ts";
import { useAuthCallback } from "./use-auth-callback.tsx";

export const LoginForm: FunctionalComponent = () => {
  useAuthCallback();

  const [server, setServer] = useState("");

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
          alignItems: "stretch",
        }}
      >
        <input
          type="text"
          placeholder="Server URL (i.e. mastodon.social)"
          value={server}
          autoCapitalize="off"
          onChange={(e) => setServer(e.currentTarget.value)}
        />
        <br />
        <input type="submit" value="Login" />
      </div>
    </form>
  );
};
