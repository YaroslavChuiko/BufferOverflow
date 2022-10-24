import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ['Post', 'Answer', 'Comment'],
  endpoints: (builder) => ({
    getAuthor: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    getCategories: builder.query({
      query: (q) => `/categories?_end=10&_order=ASC&_sort=title&_start=0&q=${q}`,
      transformResponse(categories) {
        return categories.map((item) => ({ id: item.id, label: item.title, value: item.title }));
      },
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
        body: {},
      }),
    }),
  }),
});

// ! add logout and invalidate all tags

export const {
  useGetAuthorQuery,
  useLazyGetAuthorQuery,
  useLazyGetCategoriesQuery,
  useDeleteUserMutation,
} = apiSlice;
