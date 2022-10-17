import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ['Post', 'Comment'],
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
    getAuthor: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    getPostCategories: builder.query({
      query: (queryParams) => `/categories${queryParams}`,
    }),
    getPostAnswers: builder.query({
      query: (queryParams) => `/comments${queryParams}`,
      transformResponse(comments, meta) {
        return { comments, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result, error, arg) => {
        const comments = result?.comments || [];
        return ['Comment', ...comments.map(({ id }) => ({ type: 'Comment', id }))];
      },
    }),
    addNewAnswer: builder.mutation({
      query: ({ author_id, post_id, content, status }) => ({
        url: `/comments`,
        method: 'POST',
        body: { author_id, post_id, content, status },
      }),
      invalidatesTags: ['Comment'],
    }),
    deleteAnswer: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: ['Comment'],
    }),
    checkPostLike: builder.query({
      query: ({target, id}) => `/${target}/${id}/checkLike`,
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
  useGetAuthorQuery,
  useLazyGetAuthorQuery,
  useGetPostCategoriesQuery,
  useLazyGetPostCategoriesQuery,
  useGetPostAnswersQuery,
  useCheckPostLikeQuery,
  useLazyGetCategoriesQuery,
  useAddNewAnswerMutation,
  useDeleteAnswerMutation,
} = apiSlice;
