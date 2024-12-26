import axios from "axios";
import React, { createContext, useContext } from "react";
import { isInternalUrl } from "./helpers";
import { EnhancedStore } from "@reduxjs/toolkit";
import { selectAuthToken } from "./features/selectors";
import { logout, setToken } from "./features/auth/authSlice";

export type ApiConfig = {
    apiBaseUrl: string,
}

const configureApi = (apiConfig: ApiConfig, store: EnhancedStore) => {
    // Set default base URL
    axios.defaults.baseURL = apiConfig.apiBaseUrl;

    // Add request interceptor
    axios.interceptors.request.use(
        (config) => {
            // Check if the request is internal
            if (config.url && isInternalUrl(config.url, apiConfig.apiBaseUrl)) {
                const state = store.getState();
                const token = selectAuthToken(state);

                config.headers = config.headers || {};

                if (token?.access_token) {
                    // Set Authorization header if token exists
                    config.headers['Authorization'] = `Bearer ${token.access_token}`;
                }
            }
            return config;
        },
        (error) => Promise.reject(error) // Forward the error
    );

    // Add response interceptor
    axios.interceptors.response.use(
        (response) => response, // Pass through valid responses
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // Get the current state
                    const state = store.getState();
                    const token = selectAuthToken(state);

                    if (token?.refresh_token) {
                        // Refresh the token
                        const response = await fetch(
                            `${apiConfig.apiBaseUrl}/auth/user/refresh-token`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ refresh_token: token.refresh_token })
                            }
                        );

                        if (!response.ok) {
                            throw new Error('Failed to refresh token');
                        }

                        const res = await response.json();

                        const newToken = res.data.token;
                        const { access_token } = newToken;

                        // Update the token in the store
                        store.dispatch(setToken(newToken));

                        // Retry the original request with the new token
                        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

                        return axios(originalRequest);
                        //return window.location.reload();
                    } else {
                        // Logout if no refresh token is available
                        store.dispatch(setToken(null));
                        store.dispatch(logout());
                        return Promise.reject(new Error('Refresh token is missing'));
                    }
                } catch (refreshError) {
                    // Handle errors during token refresh
                    store.dispatch(setToken(null));
                    store.dispatch(logout());

                    return Promise.reject(refreshError);
                }
            }

            // For other errors, reject the promise
            return Promise.reject(error);
        }
    );
};


export type LarabizProviderProps = {
    apiConfig: ApiConfig,
    store: EnhancedStore,
    children: React.ReactNode,
}

const LarabizContext = createContext<{
    apiConfig: ApiConfig | null,
    store: EnhancedStore | null,
}>({
    apiConfig: null,
    store: null,
});

export function useLarabiz() {
    const context = useContext(LarabizContext);
    if (!context) {
        throw new Error("useGlobalLoading must be used within GlobalLoadingProvider");
    }
    return context;
}

export default function LarabizProvider({ apiConfig, store, children }: LarabizProviderProps) {
    configureApi(apiConfig, store);

    const value = { apiConfig, store };

    return (
        <LarabizContext.Provider value={value}>{children}</LarabizContext.Provider>
    );

    return (
        <>
            {children}
        </>
    );
}
