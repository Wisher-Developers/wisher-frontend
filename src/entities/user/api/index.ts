import baseApi from "@shared/api"
import { loadToken } from "@shared/auth/token"

import {
  AuthResponse,
  LoginParams,
  RegisterParams,
  UpdateProfileParams,
} from "./types"

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
      invalidatesTags: ["User", "Wishitem", "Wishlist"],
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
      invalidatesTags: ["User", "Wishitem", "Wishlist"],
    }),

    updateProfile: builder.mutation<User, UpdateProfileParams>({
      query: data => ({
        url: "/users/update",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          dispatch(
            userApi.util.updateQueryData("getMe", undefined, draft =>
              Object.assign(draft, data)
            )
          )
        } catch {}
      },
      invalidatesTags: [{ type: "User", id: "ME" }],
    }),

    searchUsers: builder.query<User[], string>({
      query: query => `/users/search/${query}`,
      providesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
})

export default userApi

export const {
  useGetUserQuery,
  useGetMeQuery,
  useSignUpMutation,
  useSignInMutation,
  useUpdateProfileMutation,
  useSearchUsersQuery,
} = userApi
