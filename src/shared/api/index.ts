import { baseApi } from "./base"

export const apiReducers = {
  [baseApi.reducerPath]: baseApi.reducer,
}

export const apiMiddlewares = [baseApi.middleware] as const

export { baseApi as default }
