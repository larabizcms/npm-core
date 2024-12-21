import { createSlice } from '@reduxjs/toolkit';
import { getGeneralData } from './settingActions';

export type Setting = {
    user_registration: boolean,
    user_verification: boolean,
    title: string,
    sitename: string,
    description: string,
    app_name: string,
    logo: string | null,
    [key: string]: any
};

export type MenuItem = {
    key: string,
    title: string,
    target: string,
    url: string,
    external: boolean,
    disabled: boolean,
    icon: string,
    chip?: any,
    children?: MenuItem[],
    permissions?: string[],
    type: 'collapse' | 'item',
}

export type GeneralData = {
    settings: Setting,
    login_socials: string[],
    // captcha: {
    //     activator: string | null,
    //     key: string,
    // },
    // firebase: {
    //   api_key: string,
    //   auth_domain: string,
    //   project_id: string,
    //   storage_bucket: string,
    //   messaging_sender_id: string,
    //   app_id: string,
    //   measurement_id: string,
    // },
}

export interface SettingState {
    loading: boolean;
    general: null | GeneralData;
    settings: null | Setting;
    success: boolean;
    error: null | string;
}

const initialState: SettingState = {
    loading: false,
    general: null,
    settings: null,
    success: false,
    error: null
}

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        // General
        builder.addCase(getGeneralData.pending, (state, action) => {
            state.loading = true;
            state.general = null;
            state.settings = null;
            state.error = null;
        }),
            builder.addCase(getGeneralData.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.general = (payload as any).data;
                state.settings = (payload as any).data.settings;
            }),
            builder.addCase(getGeneralData.rejected, (state, { payload }) => {
                state.loading = false;
                state.general = null;
                state.settings = null;
                state.error = (payload as any)?.message;
            })
    },
})

//export const { logout, setUser } = settingSlice.actions;

export default settingSlice.reducer;
