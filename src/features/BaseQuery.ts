import http from "@larabizcms/larabizcms/http-common";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { store } from "@local/store";
import { refreshToken } from "./auth/authActions";
import {isRefreshTokenLoading, selectAuthToken} from "@larabizcms/larabizcms/features/selectors";

export const onQueryStartedError = async (args: any, { queryFulfilled }: { queryFulfilled: Promise<any> }) => {
    try {
        await queryFulfilled;
    } catch (e: any) {
        // console.log(e);
        // handle error here, dispatch toast message
        if (e.error.status === 401) {
            // redirect to login
            const state = store.getState();
            const token = selectAuthToken(state);
            const loading = isRefreshTokenLoading(state);

            if (!loading && token && token.refresh_token) {
                store.dispatch(refreshToken({
                    refresh_token: token.refresh_token,
                }));
            }
        }

        throw e;
    }
};

const customBaseQuery = (
    //{ baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
    {
        url: string
        method: AxiosRequestConfig['method']
        data?: AxiosRequestConfig['data']
        params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
> =>
    async ({ url, method, data, params }) => {
        try {
            const result = await http.request({ url: url, method, data, params });

            return { data: result.data };
        } catch (axiosError) {
            let err = axiosError as AxiosError;

            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    };

export default customBaseQuery;
