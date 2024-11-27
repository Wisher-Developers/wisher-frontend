import { UploadImageReponse } from "./types"

import { baseApi } from "../base"

const imageApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    uploadImage: builder.mutation<UploadImageReponse, File>({
      query: file => {
        const formData = new FormData()

        formData.append("file", file)

        return {
          url: "/image",
          method: "POST",
          body: formData,
        }
      },
    }),
  }),
})

export const { useUploadImageMutation } = imageApi

export default imageApi
