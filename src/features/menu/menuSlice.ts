
import { createSlice } from '@reduxjs/toolkit';
import { fetchMenus } from './menuActions';

export type Menu = {
    key: string;
    title: string;
    url: string;
    icon: null | string;
    children?: Menu[];
    permissions?: string[];
    type: 'collapse' | 'item';
    parent: string | null;
    group: string | null;
    position: string | null;
    external: boolean;
    disabled: boolean;
    target: string;
}

export type Menus = {
    menu_left: {
        items: Menu[],
    },
    menu_top: {
        items: Menu[],
    },
    profile: {
        items: Menu[],
    }
}

export interface MenuState {
    loading: boolean;
    success: boolean;
    error?: string;
    payload: null | {} | unknown;
    menus?: Menus;
}

const initialState: MenuState = {
    loading: false,
    success: false,
    payload: null,
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMenus.pending, (state, action) => {
            state.loading = true;
            state.payload = null;
        }),
        builder.addCase(fetchMenus.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.success = true;
            state.menus = payload.data;
        }),
        builder.addCase(fetchMenus.rejected, (state, action) => {
            state.loading = false;
            state.payload = action.payload;
            state.menus = undefined;
            state.error = action.error.message;
        })
    },
});

export const selectAllMenus = (state: any) => state.menu.menus;

export default menuSlice.reducer;
