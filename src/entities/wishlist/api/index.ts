import reverse from "lodash/reverse"

import { User } from "@entities/user/@x/wishlist"
import baseApi from "@shared/api"

import {
  ChangeAccessParams,
  ChangePrivacyParams,
  CreateWishlistParams,
  RenameWishlistParams,
} from "./types"

import { Wishlist } from "../model/Wishlist"

const wishlistApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWishlists: builder.query<Wishlist[], string>({
      query: ownerId => `/wishlist/user/${ownerId}`,
      providesTags: [{ type: "Wishlist", id: "LIST" }],
    }),

    getWishlist: builder.query<Wishlist, string>({
      query: id => `/wishlist/${id}`,
      providesTags: wishlist =>
        wishlist ? [{ type: "Wishlist", id: wishlist.id }] : [],
      transformResponse: (wishlist: Wishlist) => ({
        ...wishlist,
        items: reverse(wishlist.items),
      }),
    }),

    createWishlist: builder.mutation<Wishlist, CreateWishlistParams>({
      query: ({ name, description }) => ({
        url: `/wishlist/create`,
        method: "POST",
        body: { name, description },
      }),
      invalidatesTags: wishlist =>
        wishlist ? [{ type: "Wishlist", id: "LIST" }] : [],
    }),

    renameWishlist: builder.mutation<Wishlist, RenameWishlistParams>({
      query: ({ id, name, description }) => ({
        url: `/wishlist/update`,
        method: "POST",
        body: { id, name, description },
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          dispatch(
            wishlistApi.util.updateQueryData("getWishlist", id, draft =>
              Object.assign(draft, data)
            )
          )
        } catch {}
      },
      invalidatesTags: wishlist =>
        wishlist
          ? [
              { type: "Wishlist", id: wishlist.id },
              { type: "Wishlist", id: "LIST" },
            ]
          : [],
    }),
    changePrivacy: builder.mutation<Wishlist, ChangePrivacyParams>({
      query: ({ id, privacy }) => ({
        url: `/wishlist/update`,
        method: "POST",
        body: { id, privateMode: privacy },
      }),
      onQueryStarted: async ({ id, privacy }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled

          dispatch(
            wishlistApi.util.updateQueryData("getWishlist", id, draft => {
              Object.assign(draft, { privateMode: privacy })
            })
          )
        } catch {}
      },
      invalidatesTags: wishlist =>
        wishlist
          ? [
              { type: "Wishlist", id: wishlist.id },
              { type: "Wishlist", id: "LIST" },
            ]
          : [],
    }),

    getUsersWithAccess: builder.query<User[], string>({
      query: wishlistId => `/wishlist/${wishlistId}/get-all-access`,
      providesTags: (_, __, wishlistId) => [
        { type: "UserWithAccess", id: wishlistId },
      ],
    }),
    addAccess: builder.mutation<void, ChangeAccessParams>({
      query: ({ wishlistId, userId }) => ({
        url: `/wishlist/${wishlistId}/add-access/${userId}`,
        method: "POST",
      }),
      invalidatesTags: (_, error, { wishlistId }) =>
        error ? [] : [{ type: "UserWithAccess", id: wishlistId }],
    }),
    removeAccess: builder.mutation<void, ChangeAccessParams>({
      query: ({ wishlistId, userId }) => ({
        url: `/wishlist/${wishlistId}/remove-access/${userId}`,
        method: "POST",
      }),
      onQueryStarted: async (
        { wishlistId, userId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled

          dispatch(
            wishlistApi.util.updateQueryData(
              "getUsersWithAccess",
              wishlistId,
              draft => draft?.filter(user => user.id !== userId) ?? []
            )
          )
        } catch {}
      },
      invalidatesTags: (_, error, { wishlistId }) =>
        error ? [] : [{ type: "UserWithAccess", id: wishlistId }],
    }),

    deleteWishlist: builder.mutation<void, string>({
      query: id => ({
        url: `/wishlist/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: (_, error, id) =>
        error
          ? []
          : [
              { type: "Wishlist", id },
              { type: "Wishlist", id: "LIST" },
            ],
    }),

    generateAccessLink: builder.mutation<string, string>({
      query: wishlistId => ({
        url: `/wishlist/${wishlistId}/generate-link`,
        method: "POST",
        responseHandler: "text",
      }),
      onQueryStarted: async (wishlistId, { dispatch, queryFulfilled }) => {
        try {
          const { data: link } = await queryFulfilled

          dispatch(
            wishlistApi.util.updateQueryData(
              "getWishlist",
              wishlistId,
              draft => {
                Object.assign(draft, { accessLink: link })
              }
            )
          )
        } catch (error) {
          console.log(error)
        }
      },
      invalidatesTags: (_, error, wishlistId) =>
        error ? [] : [{ type: "Wishlist", id: wishlistId }],
    }),
    getWishlistByAccessLink: builder.query<Wishlist, string>({
      query: accessLink => `/wishlist/link/${accessLink}`,
      providesTags: wishlist =>
        wishlist ? [{ type: "Wishlist", id: wishlist.id }] : [],
    }),
  }),
})

export default wishlistApi

export const {
  useGetWishlistsQuery,
  useGetWishlistQuery,
  useGetUsersWithAccessQuery,
  useGetWishlistByAccessLinkQuery,
} = wishlistApi
