import customBaseQuery, { onQueryStartedError } from '../../features/BaseQuery';
import { objectToQueryString } from '../../helpers';
import { createApi } from '@reduxjs/toolkit/query/react';

export const pageApi = createApi({
    reducerPath: 'pageApi',
    baseQuery: customBaseQuery(),
    endpoints: (builder) => ({
        getPage: builder.query({
            query: ({ page, query }: any) => ({
                url: `/admin/pages/${page}?` + objectToQueryString(query as any),
                method: 'GET',
            }),
            onQueryStarted: onQueryStartedError,
        }),
    }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPageQuery } = pageApi;
