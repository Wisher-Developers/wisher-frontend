import baseApi from "@shared/api"
import { loadToken } from "@shared/auth/token"

import { AuthResponse, LoginParams, RegisterParams } from "./types"

import { User } from "../model/User"

const FIFTEEN_MINUTES = 15 * 60

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => "/user", // TODO: replace with actual endpoint
      providesTags: ["User"],
      keepUnusedDataFor: FIFTEEN_MINUTES,
    }),

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

export const { useGetUserQuery, useSignUpMutation, useSignInMutation } = userApi
