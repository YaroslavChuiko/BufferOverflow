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
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{type: 'Post', id: arg}],
    }),
    getPostAuthor: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    getPostCategories: builder.query({
      query: (queryParams) => `/categories${queryParams}`,
    }),
    getPostComments: builder.query({
      query: (queryParams) => `/comments/${queryParams}`,
      transformResponse(comments, meta) {
        return { comments, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
    }),
    checkPostLike: builder.query({
      query: (postId) => `/posts/${postId}/checkLike`,
    }),
    getCategories: builder.query({
      query: (q) => `/categories?_end=10&_order=ASC&_sort=title&_start=0&q=${q}`,
      transformResponse(categories) {
        return categories.map((item) => ({ id: item.id, label: item.title, value: item.title }));
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostAuthorQuery,
  useLazyGetPostAuthorQuery,
  useGetPostCategoriesQuery,
  useLazyGetPostCategoriesQuery,
  useGetPostCommentsQuery,
  useCheckPostLikeQuery,
  useLazyGetCategoriesQuery,
} = apiSlice;
