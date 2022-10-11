import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLike: builder.mutation({
      query: ({ author_id, target_post, target_comment, type }) => ({
        url: `/likes`,
        method: 'POST',
        body: { author_id, target_post, target_comment, type },
      }),
      async onQueryStarted({ target_post, target_comment, type }, { dispatch, queryFulfilled, getState }) {
        const id = target_post || target_comment;
        const tagType = target_post ? 'Post' : 'Comment';
        const patchResults = [];

        for (const { endpointName, originalArgs } of apiSlice.util.selectInvalidatedBy(getState(), [{ type: tagType, id }])) {
          if (endpointName === 'getPosts') {
            patchResults.push(
              dispatch(
                apiSlice.util.updateQueryData(endpointName, originalArgs, (draft) => {
                  const target = draft.posts.find((target) => target.id === id);
                  if (target) {
                    type === 'like' ? target.rating++ : target.rating--;
                  }
                })
              )
            );
          }
        }
        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((item) => item.undo());
          // patchResult.undo();
        }
      },
    }),
    updateLike: builder.mutation({
      query: ({ author_id, target_post, target_comment, type }) => ({
        url: `/likes`,
        method: 'POST',
        body: { author_id, target_post, target_comment, type },
      }),
      async onQueryStarted({ target_post, target_comment, type }, { dispatch, queryFulfilled, getState }) {
        const id = target_post || target_comment;
        const tagType = target_post ? 'Post' : 'Comment';
        const patchResults = [];

        for (const { endpointName, originalArgs } of apiSlice.util.selectInvalidatedBy(getState(), [{ type: tagType, id }])) {
          if (endpointName === 'getPosts') {
            patchResults.push(
              dispatch(
                apiSlice.util.updateQueryData(endpointName, originalArgs, (draft) => {
                  const target = draft.posts.find((target) => target.id === id);
                  if (target) {
                    type === 'like' ? (target.rating += 2) : (target.rating -= 2);
                  }
                })
              )
            );
          }
        }
        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((item) => item.undo());
        }
      },
    }),
    deleteLike: builder.mutation({
      query: ({ author_id, target_post, target_comment, type }) => ({
        url: `/likes`,
        method: 'DELETE',
        body: { author_id, target_post, target_comment },
      }),
      async onQueryStarted({ target_post, target_comment, type }, { dispatch, queryFulfilled, getState }) {
        const id = target_post || target_comment;
        const tagType = target_post ? 'Post' : 'Comment';
        const patchResults = [];

        for (const { endpointName, originalArgs } of apiSlice.util.selectInvalidatedBy(getState(), [{ type: tagType, id }])) {
          if (endpointName === 'getPosts') {
            patchResults.push(
              dispatch(
                apiSlice.util.updateQueryData(endpointName, originalArgs, (draft) => {
                  const target = draft.posts.find((target) => target.id === id);
                  if (target) {
                    type === 'like' ? target.rating-- : target.rating++;
                  }
                })
              )
            );
          }
        }
        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((item) => item.undo());
        }
      },
    }),
  }),
});

export const { useAddLikeMutation, useDeleteLikeMutation, useUpdateLikeMutation } = extendedApiSlice;
