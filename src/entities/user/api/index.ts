import baseApi from "@shared/api"
import { loadToken } from "@shared/auth/token"

import { AuthResponse, LoginParams, RegisterParams } from "./types"

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<AuthResponse, RegisterParams>({
      query: ({ name, email, password }) => ({
        url: "/auth/signup", // TODO: replace with actual endpoint
        method: "POST",
        body: { name, email, password },
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled

        dispatch(loadToken(data.token))
      },
    }),

    signIn: builder.mutation<AuthResponse, LoginParams>({
      query: ({ name, password }) => ({
        url: "/auth/signin", // TODO: replace with actual endpoint
        method: "POST",
        body: { name, password },
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled

        dispatch(loadToken(data.token))
      },
    }),
  }),
})

export const { useSignUpMutation, useSignInMutation } = userApi
