import { configureStore } from "@reduxjs/toolkit"

import { apiMiddlewares, apiReducers } from "@shared/api"

export const store = configureStore({
  reducer: {
    ...apiReducers,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiMiddlewares),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
