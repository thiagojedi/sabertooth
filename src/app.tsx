import { SWRConfig } from "swr";

import { getFetcher } from "./common/helpers/request.ts";
import { useAppConfig } from "./application/hooks.ts";
import IndexRoute from "./routes";

export const App = () => {
  const { data } = useAppConfig();

  return (
    <SWRConfig value={{ fetcher: getFetcher(data) }}>
      <IndexRoute />
    </SWRConfig>
  );
};
