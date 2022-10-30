import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ['Post', 'Answer', 'Comment'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (q) => `/categories?_end=10&_order=ASC&_sort=title&_start=0&q=${q}`,
      transformResponse(categories) {
        return categories.map((item) => ({ id: item.id, label: item.title, value: item.title }));
      },
    }),
    getAuthor: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    updateUserData: builder.mutation({
      query: ({ id, login, full_name, profile_picture, role }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: { login, full_name, profile_picture, role },
      }),
    }),
    updateUserAvatar: builder.mutation({
      query: (body) => ({
        url: `/users/avatar`,
        method: 'PATCH',
        body: body,
      }),
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

export const {
  useGetAuthorQuery,
  useLazyGetAuthorQuery,
  useLazyGetCategoriesQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserDataMutation,
  useDeleteUserMutation,
} = apiSlice;
