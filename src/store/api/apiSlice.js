import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ['Post', 'Answer', 'Comment'],
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
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),
    createPost: builder.mutation({
      query: ({ author_id, title, content, post_categories, status}) => ({
        url: `/posts`,
        method: 'POST',
        body: { author_id, title, content, post_categories, status},
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      query: ({ id, author_id, title, content, post_categories, status }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: { author_id, title, content, post_categories, status },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: ['Post'],
    }),
    getPostCategories: builder.query({
      query: (queryParams) => `/categories${queryParams}`,
    }),
    getAuthor: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    getCategories: builder.query({
      query: (q) => `/categories?_end=10&_order=ASC&_sort=title&_start=0&q=${q}`,
      transformResponse(categories) {
        return categories.map((item) => ({ id: item.id, label: item.title, value: item.title }));
      },
    }),
  }),
});

// ! add logout and invalidate all tags

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetAuthorQuery,
  useLazyGetAuthorQuery,
  useGetPostCategoriesQuery,
  useLazyGetPostCategoriesQuery,
  useLazyGetCategoriesQuery,
} = apiSlice;
