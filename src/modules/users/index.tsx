import useSWR from "swr";
import { logout } from "../../application/auth";
import { useNavigate } from "react-router-dom";
import type { FunctionalComponent } from "preact";
import { Avatar } from "../../common/components/avatar";
import { useAppConfig } from "../../application/hooks.ts";
import type { RequestError } from "../../common/errors.ts";

export const useCurrentUser = () => {
  const navigate = useNavigate();
  const { data: config, mutate } = useAppConfig();

  const { data: userData, error } = useSWR<Account>(
    config?.token && "/api/v1/accounts/verify_credentials",
    {
      shouldRetryOnError: (error: RequestError) => error.status !== 401,
      onError: () =>
        logout()
          .then(() => mutate())
          .then(() =>
            navigate("/", {
              replace: true,
            }),
          ),
    },
  );

  return error ? undefined : userData;
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
