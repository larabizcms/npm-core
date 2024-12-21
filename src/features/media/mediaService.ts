import customBaseQuery, { onQueryStartedError } from '@larabizcms/larabizcms/features/BaseQuery';
import { objectToQueryString } from '@larabizcms/admin/helpers/helper';
import { createApi } from '@reduxjs/toolkit/query/react';

export type MediaQueryType = {
    page: number,
    limit: number,
    parent_id?: number | string | null | undefined,
    root?: boolean,
    q?: string,
    accept?: string,
    file_type?: string,
}

export const mediaApi = createApi({
    reducerPath: 'mediaApi',
    baseQuery: customBaseQuery(),
    endpoints: (builder) => ({
        getMedia: builder.query<any, MediaQueryType>({
            query: (query: MediaQueryType) => ({
                url: '/media?'+ objectToQueryString(query as any),
                method: 'GET',
            }),
            onQueryStarted: onQueryStartedError,
        }),
    }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMediaQuery } = mediaApi
