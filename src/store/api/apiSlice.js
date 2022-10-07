// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (queryParams) => `/posts${queryParams}`,
      transformResponse(posts, meta) {
        return { posts, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
    }),
    getPostAuthor: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    getPostCategories: builder.query({
      query: (queryParams) => `/categories${queryParams}`,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery, useGetPostAuthorQuery, useGetPostCategoriesQuery } = apiSlice;
