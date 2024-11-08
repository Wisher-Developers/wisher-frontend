import baseApi from "@shared/api"

import { CreateWishlistParams, RenameWishlistParams } from "./types"

import { Wishlist } from "../model/Wishlist"

const wishlistApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWishlists: builder.query<Wishlist[], string | undefined>({
      query: ownerId => ({ url: `/wishlists`, params: { ownerId } }), // TODO: replace with actual endpoint
      providesTags: [{ type: "Wishlist", id: "LIST" }],
    }),

    getWishlist: builder.query<Wishlist, string>({
      query: id => `/wishlists/${id}`, // TODO: replace with actual endpoint
      providesTags: wishlist =>
        wishlist ? [{ type: "Wishlist", id: wishlist.id }] : [],
    }),

    createWishlist: builder.mutation<Wishlist, CreateWishlistParams>({
      query: ({ name, description }) => ({
        url: `/wishlists/create`, // TODO: replace with actual endpoint
        method: "POST",
        body: { name, description },
      }),
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),

    renameWishlist: builder.mutation<Wishlist, RenameWishlistParams>({
      query: ({ name, description }) => ({
        url: `/wishlists/rename`, // TODO: replace with actual endpoint
        method: "POST",
        body: { name, description },
      }),
      invalidatesTags: wishlist =>
        wishlist ? [{ type: "Wishlist", id: wishlist.id }] : [],
    }),

    deleteWishlist: builder.mutation<void, string>({
      query: id => ({ url: `/wishlists/delete`, method: "POST", body: { id } }), // TODO: replace with actual endpoint
      invalidatesTags: (_, error, id) =>
        error
          ? [
              { type: "Wishlist", id },
              { type: "Wishlist", id: "LIST" },
            ]
          : [],
    }),
  }),
})

export default wishlistApi

export const { useGetWishlistsQuery, useGetWishlistQuery } = wishlistApi