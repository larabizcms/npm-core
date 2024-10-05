import customBaseQuery, { onQueryStartedError } from '@larabiz/features/BaseQuery';
import i18n from '@larabiz/i18n';
import { createApi } from '@reduxjs/toolkit/query/react';

export const pageApi = createApi({
    reducerPath: 'pageApi',
    baseQuery: customBaseQuery(),
    endpoints: (builder) => ({
        getPage: builder.query({
            query: (page) => ({
                url: `/admin/pages/${page}?locale=${i18n.language}`,
                method: 'GET',
            }),
            onQueryStarted: onQueryStartedError,
        }),
    }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPageQuery } = pageApi;
