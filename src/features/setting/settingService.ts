import customBaseQuery, { onQueryStartedError } from '../BaseQuery';
import { objectToQueryString } from '../../helpers';
import { CallAPIData, SettingData } from '../../types/SettingData';
import { createApi } from '@reduxjs/toolkit/query/react';

export const settingApi = createApi({
    reducerPath: 'settingApi',
    baseQuery: customBaseQuery(),
    endpoints: (builder) => ({
        getGeneral: builder.query({
            query: (props: any) => ({
                url: '/admin/general?' + objectToQueryString(props),
                method: 'GET',
            }),
            onQueryStarted: onQueryStartedError,
        }),
        getSettings: builder.query({
            query: (props: SettingData) => ({
                url: '/admin/settings?' + objectToQueryString(props),
                method: 'GET',
            }),
            onQueryStarted: onQueryStartedError,
        }),
        getSettingForms: builder.query({
            query: (props: SettingData) => ({
                url: '/admin/settings/forms?' + objectToQueryString(props),
                method: 'GET',
            }),
            onQueryStarted: onQueryStartedError,
        }),
        callAPI: builder.mutation({
            query: (props: CallAPIData) => ({
                url: props.uri,
                method: props.method,
                data: props.data,
            }),
            onQueryStarted: onQueryStartedError,
        }),
    }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCallAPIMutation, useGetGeneralQuery, useGetSettingFormsQuery, useGetSettingsQuery } = settingApi;
