import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  endpoints: (builder) => ({
    getOptions: builder.query({
      query: () => "data",
    }),
    addComment: builder.mutation({
      query: ({ id, coment }) => ({
        url: `data/${id}`,  
        method: "PATCH",
        body: {
          comment: coment  
        },
      }),
    }),
  }),
})

export const { useGetOptionsQuery, useAddCommentMutation } = userApi
