import { createSlice } from '@reduxjs/toolkit';

export type Permission = {
    code: string;
    name: string;
    description: string;
    group: string;
};

export type PermissionGroup = {
    code: string;
    name: string;
    description: string;
};

export type Role = {
    id: string;
    code: string;
    name: string;
    description: string;
    grant_all_permissions: boolean;
    permissions: Permission[];
};

export interface PermissionState {
    loading: boolean;
    page: null | {};
    success: boolean;
    error: null | string;
}

const initialState: PermissionState = {
    loading: false,
    page: null,
    success: false,
    error: null
}

const permissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {

    },
});

export default permissionSlice.reducer;
