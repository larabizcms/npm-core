import http from '@local/http-common';
import { createAppAsyncThunk } from '../withTypes';
import { Menus } from './menuSlice';
import { objectToQueryString } from '@larabizcms/admin/helpers/helper';

export type MenuList = {
    data: Menus;
    total: number;
}

export type MenuQuery = {
    limit?: number;
}

export const fetchMenus = createAppAsyncThunk('admin/menu', async (query?: MenuQuery) => {
    const response = await http.get<MenuList>('/admin/menu'+(query ? '?'+objectToQueryString(query) : ''));

    return response.data;
});
