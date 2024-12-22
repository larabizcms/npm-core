import axios from "axios";
import React from "react";
import { isInternalUrl } from "./helpers";
import { EnhancedStore } from "@reduxjs/toolkit";
import { selectAuthToken } from "./features/selectors";
import { logout, setToken } from "./features/auth/authSlice";

export type ApiConfig = {
    apiBaseUrl: string,
}

const configureApi = (apiConfig: ApiConfig, store: EnhancedStore) => {
    axios.defaults.baseURL = apiConfig.apiBaseUrl;

    axios.interceptors.request.use(
        config => {
            // Check is internal request
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
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const state = store.getState();
                    const token = selectAuthToken(state);

                    if (token && token.refresh_token) {
                        const response = await axios.post(
                            '/auth/user/refresh-token',
                            {
                                refresh_token: token.refresh_token,
                            }
                        );

                        const { access_token } = response.data.data.token;

                        store.dispatch(setToken(response.data.data.token));
                        originalRequest.headers.Authorization = `Bearer ${access_token}`;

                        return axios(originalRequest);
                    }

                    store.dispatch(setToken(null));
                    return axios(originalRequest);
                } catch (refreshError) {
                    store.dispatch(logout());

                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
};

export type LarabizProviderProps = {
    apiConfig: ApiConfig,
    store: EnhancedStore,
    children: React.ReactNode,
}

export default function LarabizProvider({ apiConfig, store, children }: LarabizProviderProps) {
    configureApi(apiConfig, store);

    return (
        <>
            {children}
        </>
    );
}
