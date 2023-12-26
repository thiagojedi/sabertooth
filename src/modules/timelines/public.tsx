import { useHomeTimeline } from "./hooks";
import { getAuthInfo } from "../../application/auth";

export const PublicTimeline = () => {
  const { statusList, error } = useHomeTimeline();

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <pre>
      <code>
        {JSON.stringify({ statusList, token: getAuthInfo() }, undefined, 2)}
      </code>
    </pre>
  );
  // return (
  //   <>
  //     {statusList
  //       .filter((status) => status.media_attachments.length === 0) // Remove when handling media
  //       .map((status) => (
  //         <>
  //           <Post key={status.id} status={status} />
  //           <hr />
  //         </>
  //       ))}
  //   </>
  // );
};
