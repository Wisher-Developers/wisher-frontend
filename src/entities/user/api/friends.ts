import baseApi from "@shared/api"

import { User } from "../model/User"

const friendsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFriends: builder.query<User[], string>({
      query: id => `/friends/${id}`,
      providesTags: [{ type: "Friends", id: "LIST" }],
    }),

    getRequestsRecieved: builder.query<User[], void>({
      query: () => "/friends/request/in/",
      providesTags: [{ type: "Friends", id: "REQUESTS_RECIEVED" }],
    }),

    getRequestsSent: builder.query<User[], void>({
      query: () => "/friends/request/out/",
      providesTags: [{ type: "Friends", id: "REQUESTS_SENT" }],
    }),

    sendRequest: builder.mutation<void, string>({
      query: id => ({
        url: `/friends/request/send/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Friends", id: "REQUESTS_SENT" }],
    }),

    acceptRequest: builder.mutation<void, string>({
      query: id => ({
        url: `/friends/request/accept/${id}`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: "Friends", id: "REQUESTS_RECIEVED" },
        {
          type: "Friends",
          id: "LIST",
        },
      ],
    }),

    rejectRequest: builder.mutation<void, string>({
      query: id => ({
        url: `/friends/request/deny/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Friends", id: "REQUESTS_RECIEVED" }],
    }),

    cancelRequest: builder.mutation<void, string>({
      query: id => ({
        url: `/friends/request/cancel/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Friends", id: "REQUESTS_SENT" }],
    }),

    removeFriend: builder.mutation<void, string>({
      query: id => ({
        url: `/friends/remove/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Friends", id: "LIST" }],
    }),
  }),
})

export default friendsApi

export const {
  useGetFriendsQuery,
  useGetRequestsSentQuery,
  useGetRequestsRecievedQuery,
} = friendsApi
