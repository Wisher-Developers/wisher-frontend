import { RouteObject } from "react-router-dom"

import HomePage from "@pages/home/ui/HomePage"
import NotFoundPage from "@pages/not-found/ui/NotFoundPage"
import NavbarLayout from "@widgets/navbar/ui/NavbarLayout"

const routes: RouteObject[] = [
  {
    path: "/",
    Component: NavbarLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]

export default routes
