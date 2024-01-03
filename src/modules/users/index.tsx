import { useNavigate } from "react-router-dom";

import { logout } from "../../application/auth/index.ts";
import { Avatar } from "../../common/components/avatar/index.tsx";

import { useCurrentUser } from "./hooks.ts";

import type { FunctionalComponent } from "preact";

export const CurrentUserAvatar: FunctionalComponent = () => {
  const currentUser = useCurrentUser();

  const navigate = useNavigate();

  if (!currentUser) {
    return null;
  }

  return (
    <button
      style={{ all: "unset", cursor: "pointer" }}
      onClick={() => logout().then(() => navigate("/"))}
    >
      <Avatar name={currentUser.display_name} url={currentUser.avatar_static} />
    </button>
  );
};
