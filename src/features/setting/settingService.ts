import customBaseQuery, { onQueryStartedError } from './BaseQuery';
import { objectToQueryString } from '../../helpers';
import i18n from '@larabizcms/admin/i18n';
import { CallAPIData, SettingData } from '@larabizcms/larabizcms/types/SettingData';
import { createApi } from '@reduxjs/toolkit/query/react';

export const settingApi = createApi({
    reducerPath: 'settingApi',
    baseQuery: customBaseQuery(),
    endpoints: (builder) => ({
        getGeneral: builder.query({
            query: () => ({
                url: '/admin/general?locale='+i18n.language,
                method: 'GET',
            }),
            onQueryStarted: onQueryStartedError,
        }),
        getSettings: builder.query({
            query: (props: SettingData) => ({
                url: '/admin/settings?locale='+i18n.language+'&'+ objectToQueryString(props),
                method: 'GET',
            }),
            onQueryStarted: onQueryStartedError,
        }),
        getSettingForms: builder.query({
            query: (props: SettingData) => ({
                url: '/admin/settings/forms?locale='+i18n.language+'&'+ objectToQueryString(props),
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
