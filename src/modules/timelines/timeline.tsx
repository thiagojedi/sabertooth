import { FunctionalComponent } from "preact";

import { Post } from "./post/index.tsx";

export const Timeline: FunctionalComponent<{ statusList: Status[] }> = ({
  statusList,
}) => (
  <div>
    {statusList.map((status) => (
      <>
        <Post key={status.id} status={status} />
        <hr />
      </>
    ))}
  </div>
);
