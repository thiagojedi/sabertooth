import { FunctionalComponent } from "preact";

import { Post } from "./post";

export const Timeline: FunctionalComponent<{ statusList: Status[] }> = ({
  statusList,
}) => (
  <div style={{ padding: "0 0.5rem" }}>
    {statusList.map((status) => (
      <>
        <Post key={status.id} status={status} />
        <hr />
      </>
    ))}
  </div>
);
