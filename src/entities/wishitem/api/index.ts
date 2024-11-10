import baseApi from "@shared/api"

import {
  CreateWishitemParams,
  DeleteWishitemParams,
  EditWishitemParams,
} from "./types"

import { Wishitem } from "../model/Wishitem"

const wishitemApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createWishitem: builder.mutation<Wishitem, CreateWishitemParams>({
      query: ({ wishlistId, name, description, priority, link }) => ({
        url: `/item/create`,
        method: "POST",
        body: { wishlistId, name, description, priority, link },
      }),
      invalidatesTags: (_, error, { wishlistId }) =>
        error ? [] : [{ type: "Wishitem", id: wishlistId }],
    }),

    editWishitem: builder.mutation<Wishitem, EditWishitemParams>({
      query: () => "",
      invalidatesTags: (_, error, { wishlistId }) =>
        error ? [] : [{ type: "Wishitem", id: wishlistId }],
    }),

    deleteWishitem: builder.mutation<void, DeleteWishitemParams>({
      query: ({ id }) => ({
        url: `/item/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: (_, error, { wishlistId }) =>
        error ? [] : [{ type: "Wishitem", id: wishlistId }],
    }),
  }),
})

export default wishitemApi
