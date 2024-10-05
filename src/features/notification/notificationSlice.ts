import { createSlice } from '@reduxjs/toolkit';

export type Notification = {
    id: string;
    title: string;
    data: any;
    read: boolean;
    read_at: string;
    created_at: string;
    updated_at: string;
}

export interface NotificationState {
    loading: boolean;
    page: null | {};
    success: boolean;
    error: null | string;
}

const initialState: NotificationState = {
    loading: false,
    page: null,
    success: false,
    error: null
}

const pageSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {

    },
})

//export const { logout, setUser } = pageSlice.actions;

export default pageSlice.reducer;
