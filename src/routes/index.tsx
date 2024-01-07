import {
  HashRouter,
  Outlet,
  Route,
  RouteObject,
  Routes as ReactRoutes,
} from "react-router-dom";

import { Layout } from "../application/layout/index.tsx";
import { Navigation } from "../application/layout/navigation.tsx";

import Login from "./login.tsx";
import HomeRoute from "./home.tsx";
import PublicRoute from "./public.tsx";
import ProfileRoute from "./profile.tsx";
import PostRoute from "./post.tsx";
import ComposeRoute from "./compose.tsx";
import NotificationsRoute from "./notifications.tsx";
import Logout from "./logout.tsx";

const routeConfig: RouteObject[] = [
  { index: true, element: <Login /> },
  { id: "home", path: "/home", element: <HomeRoute /> },
  { id: "public", path: "/public", element: <PublicRoute /> },
  {
    id: "notifications",
    path: "/notifications",
    element: <NotificationsRoute />,
  },
  { id: "toot", path: "/compose", element: <ComposeRoute /> },
  { id: "logout", path: "/logout", element: <Logout /> },
  { path: "/:acct", element: <ProfileRoute /> },
  { path: "/:acct/:postId", element: <PostRoute /> },
  { path: "/reply/:replyId?", element: <ComposeRoute /> },
];

const IndexRoute = () => (
  <HashRouter>
    <ReactRoutes>
      <Route
        path="/"
        element={
          <Layout navigationSlot={<Navigation routes={routeConfig} />}>
            <Outlet />
          </Layout>
        }
      >
        {routeConfig.map(({ element, index, path }) => (
          <Route key={path} index={index} path={path} element={element} />
        ))}
      </Route>
    </ReactRoutes>
  </HashRouter>
);

export default IndexRoute;
