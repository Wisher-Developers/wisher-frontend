import friendsApi from "@entities/user/api/friends"

export const {
  useAcceptRequestMutation,
  useCancelRequestMutation,
  useRejectRequestMutation,
} = friendsApi
