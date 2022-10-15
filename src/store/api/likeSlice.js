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
        const tags = [{ type: tagType, id }];
        const patchResults = updateRating(dispatch, getState, tags, handleAddLike, type, id);

        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((item) => item.undo());
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
        const tags = [{ type: tagType, id }];
        const patchResults = updateRating(dispatch, getState, tags, handleUpdateLike, type, id);

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
        const tags = [{ type: tagType, id }];
        const patchResults = updateRating(dispatch, getState, tags, handleDeleteLike, type, id);

        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((item) => item.undo());
        }
      },
    }),
  }),
});

const updateRating = (dispatch, getState, tags, handler, likeType, targetId) => {
  const patchResults = [];

  for (const { endpointName, originalArgs } of apiSlice.util.selectInvalidatedBy(getState(), tags)) {
    switch (endpointName) {
      case 'getPosts':
        patchResults.push(
          dispatch(
            apiSlice.util.updateQueryData(endpointName, originalArgs, (draft) => {
              const target = draft.posts.find((target) => target.id === targetId);
              handler(target, likeType);
            })
          )
        );
        break;
      case 'getPost':
        patchResults.push(
          dispatch(
            apiSlice.util.updateQueryData(endpointName, originalArgs, (draft) => {
              const target = draft.id === targetId ? draft : null;
              handler(target, likeType);
            })
          )
        );
        break;
      case 'getPostComments':
        patchResults.push(
          dispatch(
            apiSlice.util.updateQueryData(endpointName, originalArgs, (draft) => {
              const target = draft.comments.find((target) => target.id === targetId);
              handler(target, likeType);
            })
          )
        );
        break;

      default:
        break;
    }
  }

  return patchResults;
};

const handleAddLike = (target, likeType) => {
  if (target) {
    likeType === 'like' ? target.rating++ : target.rating--;
  }
};

const handleUpdateLike = (target, likeType) => {
  if (target) {
    likeType === 'like' ? (target.rating += 2) : (target.rating -= 2);
  }
};

const handleDeleteLike = (target, likeType) => {
  if (target) {
    likeType === 'like' ? target.rating-- : target.rating++;
  }
};

export const { useAddLikeMutation, useDeleteLikeMutation, useUpdateLikeMutation } = extendedApiSlice;
