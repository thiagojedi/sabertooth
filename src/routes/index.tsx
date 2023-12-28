import {
  HashRouter,
  Outlet,
  Route,
  Routes as ReactRoutes,
} from "react-router-dom";

import { Layout } from "../application/layout";
import { CurrentUserAvatar } from "../modules/users";
import { HomeTimeline } from "../modules/timelines/home.tsx";
import { PublicTimeline } from "../modules/timelines/public.tsx";

import Login from "./login.tsx";

const IndexRoute = () => (
  <HashRouter>
    <ReactRoutes>
      <Route
        path="/"
        element={
          <Layout startSlot={<CurrentUserAvatar />}>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<Login />} />
        <Route path="/home" element={<HomeTimeline />} />
        <Route path="/public" element={<PublicTimeline />} />
      </Route>
    </ReactRoutes>
  </HashRouter>
);

export default IndexRoute;
