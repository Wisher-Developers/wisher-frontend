import { configureStore } from "@reduxjs/toolkit"

import { apiMiddlewares, apiReducers } from "@shared/api"
import authReducer from "@shared/auth"

export const store = configureStore({
  reducer: {
    authReducer,
    ...apiReducers,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiMiddlewares),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
