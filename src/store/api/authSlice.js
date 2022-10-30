import { userSlice } from '../slices/userSlice';
import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ login, firstName, lastName, email, password, repassword }) => ({
        url: `/auth/register`,
        method: 'POST',
        body: { login, firstName, lastName, email, password, repassword },
      }),
    }),
    login: builder.mutation({
      query: ({ login, password }) => ({
        url: `/auth/login`,
        method: 'POST',
        body: { login, password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
        body: {},
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userSlice.actions.unsetUser());
        } catch {}
      },
      invalidatesTags: ['Post', 'Answer', 'Comment'],
    }),
    isLoggedIn: builder.query({
      query: () => ({ url: `/auth/isLoggedIn` }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          dispatch(userSlice.actions.checkIsLoggedIn(response));
        } catch {}
      },
    }),
    resetPassword: builder.mutation({
      query: ({ email }) => ({
        url: `/auth/password-reset`,
        method: 'POST',
        body: { email },
      }),
    }),
    confirmResetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `/auth/password-reset/${token}`,
        method: 'POST',
        body: { newPassword },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useConfirmResetPasswordMutation,
} = extendedApiSlice;
