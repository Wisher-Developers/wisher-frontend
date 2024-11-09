import baseApi from "@shared/api"
import { loadToken } from "@shared/auth/token"

import { AuthResponse, LoginParams, RegisterParams } from "./types"

import { User } from "../model/User"

const FIFTEEN_MINUTES = 15 * 60

const user: User = {
  id: "d9b6b8f1-9d1b-4a5c-8e3e-3b6e6f1c6f3b",
  name: "Goosescout",
  email: "m@m",
}

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      // query: () => "/user", // TODO: replace with actual endpoint
      queryFn: async () => ({ data: user }),
      providesTags: ["User"],
      keepUnusedDataFor: FIFTEEN_MINUTES,
    }),

    signUp: builder.mutation<AuthResponse, RegisterParams>({
      query: ({ name, email, password }) => ({
        url: "/auth/signup",
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

export const { useGetUserQuery, useSignUpMutation, useSignInMutation } = userApi
