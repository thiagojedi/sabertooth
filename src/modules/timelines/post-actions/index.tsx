import { FunctionalComponent } from "preact";
import { useCallback, useState } from "preact/hooks";

import { PostFooter } from "../../../common/components/post-footer";
import {
  boostStatus,
  favouriteStatus,
  unBoostStatus,
  unFavouriteStatus,
} from "../services";

export const PostActions: FunctionalComponent<{ status: Status }> = (props) => {
  const [status, setStatus] = useState(props.status);

  const handleClick = useCallback(
    (e: "fav" | "boost" | "reply", value?: boolean) => {
      let request;
      if (e === "fav") {
        request = value ? favouriteStatus : unFavouriteStatus;
      }
      if (e === "boost") {
        request = value ? boostStatus : unBoostStatus;
      }

      if (request) {
        request(status.id).then(setStatus);
      }
    },
    [status.id],
  );

  return <PostFooter status={status} onClick={handleClick} />;
};
