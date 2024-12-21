import customBaseQuery, { onQueryStartedError } from '@larabizcms/larabizcms/features/BaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginData } from './authActions';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials: LoginData) => ({
                url: '/auth/login',
                method: 'POST',
                data: credentials,
            }),
            onQueryStarted: onQueryStartedError,
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: '/auth/user/profile',
                method: 'GET',
            }),
            onQueryStarted: onQueryStartedError,
        }),
    }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserProfileQuery, useLoginMutation } = authApi;
