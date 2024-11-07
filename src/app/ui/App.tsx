import { Provider as ReduxProvider } from "react-redux"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { store } from "@app/model/store"
import routes from "@app/router/routes"
import GlobalStyleManager from "@shared/ui/GlobalStyleManager"

const router = createBrowserRouter(routes)

export default function App() {
  return (
    <ReduxProvider store={store}>
      <GlobalStyleManager />

      <RouterProvider router={router} />
    </ReduxProvider>
  )
}
