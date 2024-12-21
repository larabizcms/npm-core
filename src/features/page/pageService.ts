import customBaseQuery, { onQueryStartedError } from './BaseQuery';
import { objectToQueryString } from '../../helpers';
import i18n from '@larabizcms/admin/i18n';
import { createApi } from '@reduxjs/toolkit/query/react';

export const pageApi = createApi({
    reducerPath: 'pageApi',
    baseQuery: customBaseQuery(),
    endpoints: (builder) => ({
        getPage: builder.query({
            query: ({page, query}) => ({
                url: `/admin/pages/${page}?locale=${i18n.language}&`+ objectToQueryString(query as any),
                method: 'GET',
            }),
            onQueryStarted: onQueryStartedError,
        }),
    }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPageQuery } = pageApi;
