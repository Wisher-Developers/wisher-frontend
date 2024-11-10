import baseApi from "@shared/api"

import {
  CreateWishitemParams,
  DeleteWishitemParams,
  EditWishitemParams,
} from "./types"

import { Wishitem } from "../model/Wishitem"

const wishitem: Wishitem = {
  id: "1283129831928319023819283901",
  wishlistId: "d9b6b8f1-9d1b-4a5c-8e3e-3b6e6f1c6f3f",
  name: "My wishitem",
  description: "My wishitem description",
  priority: 1,
  link: "https://wishitem.com/1283129831928319023819283901",
  picture:
    "https://static.wikia.nocookie.net/gensin-impact/images/3/3a/Yae_Miko_Birthday_2023.png",
}

const wishitemApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWishitems: builder.query<Wishitem[], string>({
      queryFn: async wishlistId => ({
        data: [wishitem],
      }),
      providesTags: (_, error, wishlistId) =>
        error ? [] : [{ type: "Wishitem", id: wishlistId }],
    }),

    createWishitem: builder.mutation<Wishitem, CreateWishitemParams>({
      queryFn: async newParams => ({
        data: { ...wishitem, newParams },
      }),
      invalidatesTags: (_, error, { wishlistId }) =>
        error ? [] : [{ type: "Wishitem", id: wishlistId }],
    }),

    editWishitem: builder.mutation<Wishitem, EditWishitemParams>({
      queryFn: async newParams => ({
        data: { ...wishitem, newParams },
      }),
      invalidatesTags: (_, error, { wishlistId }) =>
        error ? [] : [{ type: "Wishitem", id: wishlistId }],
    }),

    deleteWishitem: builder.mutation<void, DeleteWishitemParams>({
      queryFn: async ({ id }) => ({ data: void 0 }),
      invalidatesTags: (_, error, { wishlistId }) =>
        error ? [] : [{ type: "Wishitem", id: wishlistId }],
    }),
  }),
})

export default wishitemApi

export const { useGetWishitemsQuery } = wishitemApi
