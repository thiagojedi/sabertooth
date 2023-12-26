import { SWRConfig } from "swr";
import { PublicTimeline } from "./modules/timelines/public";
import { Layout } from "./application/layout";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { getAuthInfo } from "./application/auth";
import { HomeTimeline } from "./modules/timelines/home.tsx";
import { LoggingIn } from "./application/auth/logging-in.tsx";

const router = createBrowserRouter(
  [
    {
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        {
          path: "/",
          element: <HomeTimeline />,
        },
        {
          path: "/public",
          element: <PublicTimeline />,
        },
        {
          path: "/oauth/callback",
          element: <LoggingIn />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

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
      <RouterProvider router={router} />
    </SWRConfig>
  );
};
