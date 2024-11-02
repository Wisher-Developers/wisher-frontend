import { Provider as ReduxProvider } from "react-redux"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { store } from "@app/model/store"
import routes from "@app/router/routes"

const router = createBrowserRouter(routes)

export default function App() {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  )
}
