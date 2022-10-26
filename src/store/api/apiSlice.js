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
    resetPassword: builder.mutation({
      query: ({ email }) => ({
        url: `/auth/password-reset`,
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

// ! add logout and invalidate all tags

export const {
  useGetAuthorQuery,
  useLazyGetAuthorQuery,
  useLazyGetCategoriesQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserDataMutation,
  useDeleteUserMutation,
  useResetPasswordMutation,
} = apiSlice;
