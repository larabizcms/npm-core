import http from '../../http-common';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type MediaBulkActionsParams = {
    action: string,
    ids: string[]
}

export const bulkActionsMedia = createAsyncThunk(
    'createFolder',
    async ({ action, ids }: MediaBulkActionsParams, thunkApi) => {
        try {
            const res = await http.post(
                `/media/bulk`,
                {
                    action: action,
                    ids: ids,
                }
            );

            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return thunkApi.rejectWithValue(error.response.data);
            } else {
                return thunkApi.rejectWithValue(error.message);
            }
        }
    }
)

export type CreateFolderParams = {
    name: string,
    parent_id: string | null | undefined | number,
    disk: string
}

export const createFolder = createAsyncThunk(
    'createFolder',
    async ({ name, parent_id }: CreateFolderParams, thunkApi) => {
        try {
            const res = await http.post(
                `/media`,
                {
                    name: name,
                    parent_id: parent_id,
                    type: 'dir',
                    disk: 'public',
                }
            );

            return res.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return thunkApi.rejectWithValue(error.response.data);
            } else {
                return thunkApi.rejectWithValue(error.message);
            }
        }
    }
)
