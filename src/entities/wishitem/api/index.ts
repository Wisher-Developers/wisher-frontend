import baseApi from "@shared/api"

import {
  CopyWishitemParams,
  CreateWishitemParams,
  DeleteWishitemParams,
  UpdateWishitemParams,
} from "./types"

import { Wishitem } from "../model/Wishitem"

const HOUR = 60 * 60

const wishitemApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createWishitem: builder.mutation<Wishitem, CreateWishitemParams>({
      query: ({ wishlistId, name, description, picture, priority, link }) => ({
        url: "/item/create",
        method: "POST",
        body: { wishlistId, name, description, picture, priority, link },
      }),
      invalidatesTags: (_, error, { wishlistId }) =>
        error ? [] : [{ type: "Wishlist", id: wishlistId }],
    }),

    updateWishitem: builder.mutation<Wishitem, UpdateWishitemParams>({
      query: ({
        id,
        name,
        description,
        picture,
        link,
        priority,
        wishlistId,
      }) => ({
        url: "/item/update",
        method: "POST",
        body: { id, name, description, picture, link, priority, wishlistId },
      }),
      invalidatesTags: (_, error) => (error ? [] : ["Wishlist"]),
    }),

    deleteWishitem: builder.mutation<void, DeleteWishitemParams>({
      query: ({ id }) => ({
        url: `/item/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: (_, error, { wishlistId }) =>
        error ? [] : [{ type: "Wishlist", id: wishlistId }],
    }),

    copyWishitem: builder.mutation<Wishitem, CopyWishitemParams>({
      query: ({
        originalId,
        wishlistId,
        name,
        description,
        picture,
        priority,
        link,
      }) => ({
        url: `/item/copy`,
        method: "POST",
        body: {
          oldId: originalId,
          wishlistId,
          name,
          description,
          picture,
          priority,
          link,
        },
      }),
      invalidatesTags: (_, error, { wishlistId }) =>
        error ? [] : [{ type: "Wishlist", id: wishlistId }],
    }),

    getRecommendations: builder.query<Wishitem[], void>({
      query: () => "/item/recommendations",
      keepUnusedDataFor: HOUR,
    }),
  }),
})

export default wishitemApi

export const { useGetRecommendationsQuery } = wishitemApi
