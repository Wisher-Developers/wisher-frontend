import wishlistApi from "@entities/wishlist/api"

export const {
  useChangePrivacyMutation,
  useGetUsersWithAccessQuery,
  useAddAccessMutation,
  useRemoveAccessMutation,
} = wishlistApi
