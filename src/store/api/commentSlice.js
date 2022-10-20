import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (answerId) => `/comments?_order=ASC&_sort=publish_date&status=active&answer_id=${answerId}`,
      transformResponse(comments, meta) {
        return { comments, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result, error, arg) => {
        const comments = result?.comments || [];
        return ['Comment', ...comments.map(({ id }) => ({ type: 'Comment', id }))];
      },
    }),
    createComment: builder.mutation({
      query: ({ author_id, answer_id, content, status }) => ({
        url: `/comments`,
        method: 'POST',
        body: { author_id, answer_id, content, status },
      }),
      invalidatesTags: ['Comment'],
    }),
    updateComment: builder.mutation({
      query: ({ id, author_id, answer_id, content, status }) => ({
        url: `/comments/${id}`,
        method: 'PUT',
        body: { author_id, answer_id, content, status },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Comment', id: arg.id }],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } =
  extendedApiSlice;
