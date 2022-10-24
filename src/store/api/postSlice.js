import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
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
      query: ({ author_id, title, content, post_categories, status }) => ({
        url: `/posts`,
        method: 'POST',
        body: { author_id, title, content, post_categories, status },
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
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostCategoriesQuery,
  useLazyGetPostCategoriesQuery,
} = extendedApiSlice;
