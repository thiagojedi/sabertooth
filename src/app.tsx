import { SWRConfig } from "swr";
import { PublicTimeline } from "./modules/timelines/public";
import { Layout } from "./application/layout";

const server = "mastodon.com.br";

export function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (key) =>
          fetch(`https://${server}${key}`).then((r) => r.json()),
      }}
    >
      <Layout>
        <div>
          <PublicTimeline />
        </div>
      </Layout>
    </SWRConfig>
  );
}
