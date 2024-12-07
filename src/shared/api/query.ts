import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"

import { RootState } from "@app/model/store"
import { withQueryParams } from "@shared/lib/withQueryParams"

export const BASE_URL = "https://v2649401.hosted-by-vdsina.ru/api"
// export const BASE_URL = "http://193.178.170.139/api"
// export const BASE_URL = "http://localhost:8080/api"

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  mode: "cors",
  paramsSerializer: withQueryParams,
  prepareHeaders: (headers, api) => {
    const {
      auth: { token },
    } = api.getState() as RootState

    const next = new Headers(headers)

    if (token) next.set("Authorization", `Bearer ${token}`)

    return next
  },
})

export const apiBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  return result
}
