import http from '../../http-common';
import { GeneralData } from './settingSlice';
import { objectToQueryString } from '../../helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type GetSettingParams = {
    locale?: string
}

export const getGeneralData = createAsyncThunk('general', async (params: GetSettingParams | undefined, { rejectWithValue }) => {
    try {
        const response = await http.get<GeneralData>('/general' + (params ? '?' + objectToQueryString(params) : ''));

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
        } else {
            return rejectWithValue(error.message)
        }
    }
});

// export const getGeneralData = createAsyncThunk(
//     'admin/general',
//     async (undefined, thunkApi) => {
//         try {
//             const { data } = await thunkApi.dispatch(
//                 settingApi.endpoints.getGeneral.initiate({})
//             );

//             if (data && data.success === true) {
//                 return data;
//             }

//             return thunkApi.rejectWithValue(data);
//         } catch (error: any) {
//             if (error.response && error.response.data) {
//                 return thunkApi.rejectWithValue(error.response.data);
//             } else {
//                 return thunkApi.rejectWithValue(error.message);
//             }
//         }
//     }
// )

// export const callAPI = createAsyncThunk(
//     'call-api',
//     async (args: CallAPIData, thunkApi) => {
//         try {
//             const { data: res } = await thunkApi.dispatch(
//                 settingApi.endpoints.callAPI.initiate(args)
//             );

//             if (res && res.success === true) {
//                 return res;
//             }

//             return thunkApi.rejectWithValue(res);
//         } catch (error: any) {
//             if (error.response && error.response.data) {
//                 return thunkApi.rejectWithValue(error.response.data);
//             } else {
//                 return thunkApi.rejectWithValue(error.message);
//             }
//         }
//     }
// )
