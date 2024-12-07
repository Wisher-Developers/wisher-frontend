import reverse from "lodash/reverse"

import baseApi from "@shared/api"

import { CreateWishlistParams, RenameWishlistParams } from "./types"

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
              {
                type: "Wishlist",
                id: "LIST",
              },
            ]
          : [],
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
  }),
})

export default wishlistApi

export const { useGetWishlistsQuery, useGetWishlistQuery } = wishlistApi
