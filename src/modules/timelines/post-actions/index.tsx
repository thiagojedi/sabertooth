import { FunctionalComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";

import { PostFooter } from "../../../common/components/post-footer/index.tsx";
import {
  boostStatus,
  favouriteStatus,
  unBoostStatus,
  unFavouriteStatus,
} from "../services/index.ts";
import { getPostPath } from "../../../common/helpers/navigation.ts";

export const PostActions: FunctionalComponent<{ status: Status }> = (props) => {
  const [status, setStatus] = useState(props.status);

  const navigate = useNavigate();

  const handleClick = useCallback(
    (e: "fav" | "boost" | "reply", value?: boolean) => {
      if (e === "fav") {
        const request = value ? favouriteStatus : unFavouriteStatus;
        request(status.id).then(setStatus);
        return;
      }

      if (e === "boost") {
        const request = value ? boostStatus : unBoostStatus;
        request(status.id).then(setStatus);
        return;
      }

      navigate(getPostPath(status));
    },
    [navigate, status],
  );

  return <PostFooter status={status} onClick={handleClick} />;
};
