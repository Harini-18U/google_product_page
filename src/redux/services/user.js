import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://66501c6cec9b4a4a6030bead.mockapi.io/users' }),
  endpoints: (builder) => ({
    // To get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "",
        method: "GET"
      })
    }),

    // To create a account
    createAccount: builder.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateAccountMutation, useGetAllUsersQuery } = userAPI