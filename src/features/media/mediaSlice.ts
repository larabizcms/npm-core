import { createSlice } from '@reduxjs/toolkit';
import { createFolder } from './mediaActions';

export type Media = {
    id: number;
    name: string;
    path: string;
    type: string;
    size: number;
    readable_size: string;
    url: string;
    mime_type: string;
    disk: string;
    is_directory: boolean;
    is_video: boolean;
    parent_id: number | null,
    is_image: boolean;
    created_at: string;
    updated_at: string;
}

export type Folder = {
    id: number,
    name: string,
    parent_id: number | null,
    created_at: string,
    updated_at: string,
}

export interface MediaState {
    loading: boolean;
    success: boolean;
    error: null | string;
    payload: null | {} | unknown;
    media?: Media | null;
}

const initialState: MediaState = {
    loading: false,
    success: false,
    error: null,
    payload: null,
    media: null,
}

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(createFolder.pending, (state, action) => {
            state.loading = true;
            state.payload = null;
        }),
        builder.addCase(createFolder.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.success = true;
            state.media = payload.data as Media;
        }),
        builder.addCase(createFolder.rejected, (state, action) => {
            state.loading = false;
            state.payload = action.payload;
        })
    },
})

//export const { logout, setUser } = mediaSlice.actions;

export default mediaSlice.reducer;
