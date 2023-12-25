import { SWRConfig } from "swr";
import { PublicTimeline } from "./modules/timelines/public";

const server = "mastodon.com.br";

export function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (key) =>
          fetch(`https://${server}${key}`).then((r) => r.json()),
      }}
    >
      <h1>SaberTooth</h1>
      <div>
        <PublicTimeline />
      </div>
    </SWRConfig>
  );
}
