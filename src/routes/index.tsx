import {
  HashRouter,
  Outlet,
  Route,
  Routes as ReactRoutes,
} from "react-router-dom";

import { Layout } from "../application/layout";
import { CurrentUserAvatar } from "../modules/users";

import Login from "./login.tsx";
import HomeRoute from "./home.tsx";
import PublicRoute from "./public.tsx";
import ProfileRoute from "./profile.tsx";

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
        <Route path="/home" element={<HomeRoute />} />
        <Route path="/public" element={<PublicRoute />} />
        <Route path="/:acct" element={<ProfileRoute />} />
      </Route>
    </ReactRoutes>
  </HashRouter>
);

export default IndexRoute;
