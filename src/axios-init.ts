import axios from "axios";
import { isInternalUrl } from "./helpers";

axios.defaults.baseURL = (location.origin + '/api/v1');

axios.interceptors.request.use(
    config => {
        // Check is internal request
        if (config.url && isInternalUrl(config.url)) {
            // Get the token from cookies
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

            window.location.href = '/user/login';
        }

        return Promise.reject(error);
    }
);
