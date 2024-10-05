import { createSlice } from '@reduxjs/toolkit';
import { getPage } from './pageActions';

export type Page = {
    title: string;
    description: string;
    children: [];
    show_title: boolean;
    permissions?: string[];
    template?: string;
    params?: {[key: string]: string | number | null | boolean};
}

export interface PageState {
    loading: boolean;
    page: null | {};
    success: boolean;
    error: null | string;
}

const initialState: PageState = {
    loading: false,
    page: null,
    success: false,
    error: null
}

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        // General
        builder.addCase(getPage.pending, (state, action) => {
            state.loading = true;
            state.page = null;
            state.error = null;
        }),
            builder.addCase(getPage.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.page = (payload as any).data;
            }),
            builder.addCase(getPage.rejected, (state, { payload }) => {
                state.loading = false;
                state.page = null;
                state.error = (payload as any)?.message;
            })
    },
})

//export const { logout, setUser } = pageSlice.actions;

export default pageSlice.reducer;
