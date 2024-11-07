import { configureStore } from "@reduxjs/toolkit"

import { apiMiddlewares, apiReducers } from "@shared/api"
import authReducer from "@shared/auth"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ...apiReducers,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiMiddlewares),
  devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
