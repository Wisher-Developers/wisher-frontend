import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"

export const BASE_URL = "http://193.178.170.139:8080/api"

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  mode: "cors",
})

export const apiBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  return result
}
