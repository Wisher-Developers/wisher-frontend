import { Provider as ReduxProvider } from "react-redux"

import { store } from "@app/model/store"

export default function App() {
  return (
    <ReduxProvider store={store}>
      <h1>Hello, React!</h1>
    </ReduxProvider>
  )
}
