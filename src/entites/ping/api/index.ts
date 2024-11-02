import baseApi from "@shared/api"

import { Ping } from "./types"

const pingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPing: builder.mutation<Ping, void>({
      query: () => ({
        url: "/ping",
        method: "POST",
      }),
    }),

    getPing: builder.query<Ping, void>({
      query: () => "/ping",
    }),
  }),
})

export const { useCreatePingMutation, useGetPingQuery } = pingApi
