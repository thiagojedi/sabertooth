import { SWRConfig } from "swr";
import { PublicTimeline } from "./modules/timelines/public";
import { Layout } from "./application/layout";
import { HashRouter, Outlet, Route, Routes } from "react-router-dom";
import { HomeTimeline } from "./modules/timelines/home.tsx";
import { LoginForm } from "./application/auth/login-form.tsx";
import { CurrentUserAvatar } from "./modules/users";
import { getFetcher } from "./common/helpers/request.ts";

export const App = () => (
  <SWRConfig
    value={{
      fetcher: getFetcher(),
    }}
  >
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout startSlot={<CurrentUserAvatar />}>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<LoginForm />} />
          <Route path="/home" element={<HomeTimeline />} />
          <Route path="/public" element={<PublicTimeline />} />
        </Route>
      </Routes>
    </HashRouter>
  </SWRConfig>
);
