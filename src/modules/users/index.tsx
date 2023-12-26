import useSWR from "swr";
import { logout } from "../../application/auth";
import { useNavigate } from "react-router-dom";
import { FunctionalComponent } from "preact";
import { Avatar } from "../../common/components/avatar";

type CurrentUser = {
  display_name: string;
  avatar_static: string;
};

export const useCurrentUser = () => {
  const navigate = useNavigate();

  const { data: userData } = useSWR<CurrentUser>(
    "/api/v1/accounts/verify_credentials",
    {
      onError: () => logout().then(() => navigate("/")),
    },
  );

  return userData;
};

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
