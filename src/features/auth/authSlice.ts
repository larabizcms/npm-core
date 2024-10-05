import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, refreshToken, forgotPassword, resetPassword } from './authActions';

export type UserToken = {
    access_token: string
    expires_at: string
    expires_in: number
    refresh_token: string
    token_type: string
}

export type User = {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    uuid: string;
    status: string;
    email_verified_at: string | null;
    is_super_admin: boolean;
    roles: Array<string>;
    permissions: Array<string>;
    has_all_permissions: boolean;
    unread_notifications: number;
};

export interface AuthState {
    loading: boolean;
    refreshTokenLoading: boolean;
    user: null | User;
    userToken: null | UserToken;
    payload: null | {} | unknown;
    success: boolean;
}

const userToken = localStorage.getItem('lb_auth_token')
    ? JSON.parse(localStorage.getItem('lb_auth_token') as string)
    : null;

const initialState: AuthState = {
    loading: false,
    refreshTokenLoading: false,
    user: null,
    userToken: userToken,
    payload: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('lb_auth_token');
            state.loading = false;
            state.user = null;
            state.userToken = null;
            state.payload = null;
        },
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setToken: (state, { payload }) => {
            state.userToken = payload;
            if (payload) {
                localStorage.setItem('lb_auth_token', JSON.stringify(payload));
            } else {
                // logout();
                localStorage.removeItem('lb_auth_token');
                state.loading = false;
                state.user = null;
                state.userToken = null;
                state.payload = null;
            }
        }
    },
    extraReducers: (builder) => {
        // Register
        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true;
            state.payload = null;
        }),
            builder.addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.user;
            }),
            builder.addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.payload = action.payload;
            }),
            // Login
            builder.addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                state.payload = null;
            }),
            builder.addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;

                state.user = payload.data.user;
                state.userToken = payload.data.token;
            }),
            builder.addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.payload = action.payload;
            }),
            // Forgot Password
            builder.addCase(forgotPassword.pending, (state, action) => {
                state.loading = true;
                state.payload = null;
            }),
            builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.payload = payload;
            }),
            builder.addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.payload = action.payload;
            }),
            // Reset Password
            builder.addCase(resetPassword.pending, (state, action) => {
                state.loading = true;
                state.payload = null;
            }),
            builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.payload = payload;
            }),
            builder.addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.payload = action.payload;
            }),
            // Refresh Token
            builder.addCase(refreshToken.pending, (state, action) => {
                state.loading = true;
                state.refreshTokenLoading = true;
                state.payload = null;
            }),
            builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.refreshTokenLoading = false;
                state.success = true;

                state.user = payload.data.user;
                state.userToken = payload.data.token;
            }),
            builder.addCase(refreshToken.rejected, (state, action) => {
                state.loading = false;
                state.refreshTokenLoading = false;
                state.payload = action.payload;
            })
    },
})

export const { logout, setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
