import axios from "axios";
import React from "react";
import { isInternalUrl } from "./helpers";

export type ApiConfig = {
    apiBaseUrl: string,
}

const configureApi = (apiConfig: ApiConfig) => {
    axios.defaults.baseURL = apiConfig.apiBaseUrl;

    axios.interceptors.request.use(
        config => {
            // Check is internal request
            console.log(config.url, apiConfig.apiBaseUrl);
            
            if (config.url && isInternalUrl(config.url, apiConfig.apiBaseUrl)) {
                const token = localStorage.getItem('lb_auth_token')
                ? JSON.parse(localStorage.getItem('lb_auth_token') as string)
                : null;

                config.headers = config.headers || {};

                if (token) {
                    // If the token exists, set the Authorization header
                    config.headers['Authorization'] = `Bearer ${token.access_token}`;
                }
            }

            return config;
        },
        error => {
            // Handle the error
            // console.log(error);

            // If error 401 then remove token and redirect to login
            if (error.response && error.response.status === 401) {
                // const state = store.getState();
                // const token = selectAuthToken(state);
                // const loading = isRefreshTokenLoading(state);

                // if (!loading && token && token.refresh_token) {
                //     store.dispatch(refreshToken({
                //         refresh_token: token.refresh_token,
                //     })).then(() => {
                //         window.location.reload();
                //     });
                // }
            }

            return Promise.reject(error);
        }
    );
};

export type LarabizProviderProps = {
    apiConfig: ApiConfig,
    children: React.ReactNode,
}

export default function LarabizProvider({ apiConfig, children }: LarabizProviderProps) {
    configureApi(apiConfig);

    return (
        <>
            {children}
        </>
    );
}
