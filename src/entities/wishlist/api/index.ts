import baseApi from "@shared/api"

import { CreateWishlistParams, RenameWishlistParams } from "./types"

import { PrivateMode, Wishlist } from "../model/Wishlist"

const wishlist: Wishlist = {
  id: "d9b6b8f1-9d1b-4a5c-8e3e-3b6e6f1c6f3f",
  name: "My wishlist",
  description: "My wishlist description",
  owner: {
    id: "d9b6b8f1-9d1b-4a5c-8e3e-3b6e6f1c6f3b",
    name: "Goosescout",
    email: "m@m",
  },
  accessLink: "https://wishlist.com/1283129831928319023819283901",
  privateMode: PrivateMode.ByLink,
  allowedUsers: [
    {
      id: "d9b6b8f1-9d1b-4a5c-8e3e-3b6e6f1c6f3b",
      name: "Goosescout",
      email: "m@m",
    },
  ],
}

const wishlistApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWishlists: builder.query<Wishlist[], string | undefined>({
      // query: ownerId => ({ url: `/wishlists`, params: { ownerId } }), // TODO: replace with actual endpoint
      queryFn: async ownerId => ({
        data: [wishlist],
      }),
      providesTags: [{ type: "Wishlist", id: "LIST" }],
    }),

    getWishlist: builder.query<Wishlist, string>({
      // query: id => `/wishlists/${id}`, // TODO: replace with actual endpoint
      queryFn: async id => ({
        data: wishlist,
      }),
      providesTags: wishlist =>
        wishlist ? [{ type: "Wishlist", id: wishlist.id }] : [],
    }),

    createWishlist: builder.mutation<Wishlist, CreateWishlistParams>({
      // query: ({ name, description }) => ({
      //   url: `/wishlists/create`, // TODO: replace with actual endpoint
      //   method: "POST",
      //   body: { name, description },
      // }),
      queryFn: async ({ name, description }) => ({
        data: { ...wishlist, name, description },
      }),
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),

    renameWishlist: builder.mutation<Wishlist, RenameWishlistParams>({
      // query: ({ id, name, description }) => ({
      //   url: `/wishlists/rename`, // TODO: replace with actual endpoint
      //   method: "POST",
      //   body: { id, name, description },
      // }),
      queryFn: async ({ id, name, description }) => ({
        data: { ...wishlist, name, description },
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
        wishlist ? [{ type: "Wishlist", id: wishlist.id }] : [],
    }),

    deleteWishlist: builder.mutation<void, string>({
      // query: id => ({ url: `/wishlists/delete`, method: "POST", body: { id } }), // TODO: replace with actual endpoint
      queryFn: async id => ({
        data: void 0,
      }),
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
