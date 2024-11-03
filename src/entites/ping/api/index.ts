import baseApi from "@shared/api"

import { Ping } from "./types"

const pingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPing: builder.mutation<Ping, string>({
      query: value => ({
        url: "/ping",
        method: "POST",
        body: {
          value,
        },
      }),
    }),

    getPing: builder.query<Ping, string>({
      query: id => `/ping/${id}`,
    }),
  }),
})

export const { useCreatePingMutation, useLazyGetPingQuery } = pingApi
