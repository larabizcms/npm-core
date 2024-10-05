import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '@larabiz/http-common';
import { setToken } from './authSlice';
import { store } from '@local/store';

export type LoginData = {
    email: string;
    password: string;
};

export type RegisterData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials: LoginData, { rejectWithValue }) => {
        try {
            const res = await http.post(`/auth/user/login`, credentials)

            if (res.data && res.data.success === true) {
                store.dispatch(setToken(res.data.data.token));
                return res.data;
            }

            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/register',
    async (data: RegisterData, { rejectWithValue }) => {
        try {
            const res = await http.post(`/auth/user/register`, data)

            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

export type ForgotPasswordData = {
    email: string
}

export const forgotPassword = createAsyncThunk(
    'user/forgot-password',
    async (data: ForgotPasswordData, { rejectWithValue }) => {
        try {
            const res = await http.post(`/auth/user/forgot-password`, data);

            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

export type VerifyEmailData = {
    id: string,
    hash: string,
    expires: string,
    signature: string,
}

export const verifyEmail = createAsyncThunk(
    'user/verify-email',
    async ({ id, hash, expires, signature }: VerifyEmailData, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams({expires: expires, signature: signature}).toString();
            const res = await http.post(`/auth/user/email/verify/${id}/${hash}?${query}`);

            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

export const refreshToken = createAsyncThunk(
    'user/refresh-token',
    async (data: { refresh_token: string }, { rejectWithValue }) => {
        try {
            const res = await http.post(`/auth/user/refresh-token`, data);

            if (res.data && res.data.success === true) {
                store.dispatch(setToken(res.data.data.token));
                return res.data;
            } else {
                store.dispatch(setToken(null));
            }

            return res.data;
        } catch (error: any) {
            store.dispatch(setToken(null));

            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

export type ResetPasswordData = {
    email: string,
    token: string,
    password: string,
    password_confirmation: string,
}

export const resetPassword = createAsyncThunk(
    'user/reset-password',
    async ({ password, password_confirmation, email, token }: ResetPasswordData, { rejectWithValue }) => {
        try {
            const res = await http.post(
                `/user/reset-password/${token}`,
                {
                    password: password,
                    password_confirmation: password_confirmation,
                    email: email,
                }
            );

            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);
