import baseApi from "@shared/api"
import { loadToken } from "@shared/auth/token"

import { AuthResponse, LoginParams, RegisterParams } from "./types"

import { User } from "../model/User"

const FIFTEEN_MINUTES = 15 * 60

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, string>({
      query: id => `/users/${id}`,
      providesTags: (_, error, id) => (error ? [{ type: "User", id }] : []),
      keepUnusedDataFor: FIFTEEN_MINUTES,
    }),

    getMe: builder.query<User, void>({
      query: () => "/users/me",
      providesTags: [{ type: "User", id: "ME" }],
      keepUnusedDataFor: FIFTEEN_MINUTES,
    }),

    signUp: builder.mutation<AuthResponse, RegisterParams>({
      query: ({ username, email, password }) => ({
        url: "/auth/signup",
        method: "POST",
        body: { username, email, password },
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled

        dispatch(loadToken(data.token))
      },
    }),

    signIn: builder.mutation<AuthResponse, LoginParams>({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { username, password },
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled

        dispatch(loadToken(data.token))
      },
    }),
  }),
})

export default userApi

export const {
  useGetUserQuery,
  useGetMeQuery,
  useSignUpMutation,
  useSignInMutation,
} = userApi
