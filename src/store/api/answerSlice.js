import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnswers: builder.query({
      query: (queryParams) => `/answers${queryParams}`,
      transformResponse(answers, meta) {
        return { answers, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result, error, arg) => {
        const answers = result?.answers || [];
        return ['Answer', ...answers.map(({ id }) => ({ type: 'Answer', id }))];
      },
    }),
    createAnswer: builder.mutation({
      query: ({ author_id, post_id, content, status }) => ({
        url: `/answers`,
        method: 'POST',
        body: { author_id, post_id, content, status },
      }),
      invalidatesTags: ['Answer'],
    }),
    updateAnswer: builder.mutation({
      query: ({ id, author_id, post_id, content, status }) => ({
        url: `/answers/${id}`,
        method: 'PUT',
        body: { author_id, post_id, content, status },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Answer', id: arg.id }],
    }),
    deleteAnswer: builder.mutation({
      query: (answerId) => ({
        url: `/answers/${answerId}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: ['Answer'],
    }),
  }),
});

export const { useGetAnswersQuery, useCreateAnswerMutation, useUpdateAnswerMutation, useDeleteAnswerMutation } = extendedApiSlice;
