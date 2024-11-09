import { createApi } from "@reduxjs/toolkit/query/react"

import { apiBaseQuery } from "./query"

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: apiBaseQuery,
  endpoints: () => ({}),
  tagTypes: ["User", "Wishitem", "Wishlist"],
})
