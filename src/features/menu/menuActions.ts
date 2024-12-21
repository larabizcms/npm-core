import http from '../../http-common';
import { Menus } from './menuSlice';
import { objectToQueryString } from '../../helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type MenuList = {
    data: Menus;
    total: number;
}

export type MenuQuery = {
    limit?: number;
}

export const fetchMenus = createAsyncThunk('admin/menu', async (query?: MenuQuery) => {
    const response = await http.get<MenuList>('/admin/menu'+(query ? '?'+objectToQueryString(query) : ''));

    return response.data;
});
