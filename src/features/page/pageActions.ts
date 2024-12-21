import { createAsyncThunk } from '@reduxjs/toolkit'
import { pageApi } from './pageService';

export const getPage = createAsyncThunk(
    'page',
    async ({page, query}: {page: string, query?: any}, thunkApi) => {
        try {
            const { data } = await thunkApi.dispatch(
                pageApi.endpoints.getPage.initiate(page)
            );

            if (data && data.success === true) {
                return data;
            }

            return thunkApi.rejectWithValue(data);
        } catch (error: any) {
            if (error.response && error.response.data) {
                return thunkApi.rejectWithValue(error.response.data);
            } else {
                return thunkApi.rejectWithValue(error.message);
            }
        }
    }
)
