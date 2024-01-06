import { SWRConfig } from "swr";

import { getFetcher } from "./common/helpers/request.ts";
import { useAppConfig } from "./application/hooks.ts";
import IndexRoute from "./routes/index.tsx";

export const App = () => {
  const { config } = useAppConfig();

  return (
    <SWRConfig value={{ fetcher: getFetcher(config) }}>
      <IndexRoute />
    </SWRConfig>
  );
};
