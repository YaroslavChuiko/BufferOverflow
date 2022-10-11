import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (queryParams) => `/posts${queryParams}`,
      transformResponse(posts, meta) {
        return { posts, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result, error, arg) => {
        const posts = result?.posts || [];
        return ['Post', ...posts.map(({ id }) => ({ type: 'Post', id }))];
      },
    }),
    getPostAuthor: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    getPostCategories: builder.query({
      query: (queryParams) => `/categories${queryParams}`,
    }),
    checkPostLike: builder.query({
      query: (postId) => `/posts/${postId}/checkLike`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostAuthorQuery, useGetPostCategoriesQuery, useCheckPostLikeQuery } = apiSlice;
