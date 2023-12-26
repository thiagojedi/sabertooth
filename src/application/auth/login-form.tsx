import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { authApp } from "./index.ts";
import { useAuthCallback } from "./use-auth-callback.tsx";

export const LoginForm: FunctionalComponent = () => {
  useAuthCallback();

  const [server, setServer] = useState("");

  return (
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
        value={server}
        autoCapitalize="off"
        onChange={(e) => setServer(e.currentTarget.value)}
      />
      <button onClick={() => authApp(server)}>Login</button>
    </div>
  );
};
