import { createAsyncThunk } from '@reduxjs/toolkit'
import { settingApi } from './settingService';
import { CallAPIData } from '@larabiz/types/SettingData';

export const getGeneralData = createAsyncThunk(
    'admin/general',
    async (undefined, thunkApi) => {
        try {
            const { data } = await thunkApi.dispatch(
                settingApi.endpoints.getGeneral.initiate({})
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

export const callAPI = createAsyncThunk(
    'call-api',
    async (args: CallAPIData, thunkApi) => {
        try {
            const { data: res } = await thunkApi.dispatch(
                settingApi.endpoints.callAPI.initiate(args)
            );

            if (res && res.success === true) {
                return res;
            }

            return thunkApi.rejectWithValue(res);
        } catch (error: any) {
            if (error.response && error.response.data) {
                return thunkApi.rejectWithValue(error.response.data);
            } else {
                return thunkApi.rejectWithValue(error.message);
            }
        }
    }
)
