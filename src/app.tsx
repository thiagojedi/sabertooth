import { SWRConfig } from "swr";
import { PublicTimeline } from "./modules/timelines/public";
import { Layout } from "./application/layout";
import { HashRouter, Outlet, Route, Routes } from "react-router-dom";
import { getAuthInfo } from "./application/auth";
import { HomeTimeline } from "./modules/timelines/home.tsx";
import { LoginForm } from "./application/auth/login-form.tsx";
import {CurrentUserAvatar} from "./modules/users";

export const App = () => {
  const { server, token } = getAuthInfo();

  return (
    <SWRConfig
      value={{
        fetcher: !server
          ? undefined
          : (key) =>
              fetch(`https://${server}${key}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }).then((r) => r.json()),
      }}
    >
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout startSlot={<CurrentUserAvatar/>}>
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
};
