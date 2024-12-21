import axios from "axios";
import { apiBaseUrl, isInternalUrl } from "@larabizcms/admin/helpers/helper";
import { store } from "@local/store";
import { isRefreshTokenLoading, selectAuthToken } from "@larabizcms/larabizcms/features/selectors";
import { refreshToken } from "@larabizcms/larabizcms/features/auth/authActions";

const http = axios.create({
    baseURL: apiBaseUrl,
    // headers: getDefaultHeaders(),
});

http.interceptors.request.use(
    config => {
        // Check is internal request
        if (config.url && isInternalUrl(config.url)) {
            // Get the token from cookies
            const state = store.getState();
            const token = selectAuthToken(state);

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
            const state = store.getState();
            const token = selectAuthToken(state);
            const loading = isRefreshTokenLoading(state);

            if (!loading && token && token.refresh_token) {
                store.dispatch(refreshToken({
                    refresh_token: token.refresh_token,
                })).then(() => {
                    window.location.reload();
                });
            }
        }

        return Promise.reject(error);
    }
);

export default http;
