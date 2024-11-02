import { RouteObject } from "react-router-dom"

import HomePage from "@pages/home/ui/HomePage"
import NotFoundPage from "@pages/not-found/ui/NotFoundPage"

const routes: RouteObject[] = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]

export default routes
